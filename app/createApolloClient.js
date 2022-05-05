import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import * as SecureStore from "expo-secure-store";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import gql from "graphql-tag";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CachePersistor } from "apollo-cache-persist";
import Environment from "./constants/Environment";
import * as Sentry from "sentry-expo";

const httpLink = createHttpLink({
  uri: Environment.apiUrl
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(error => {
      Sentry.captureException(error);
      console.log(
        `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
      );
    });

  if (networkError) {
    Sentry.captureException(networkError);
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext(async () => {
  const headers = {};
  const token = await SecureStore.getItemAsync("graphcoolToken");
  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }
  return { headers };
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      addLeagueId: (_, { leagueId }, { cache }) => {
        if (leagueId) {
          const query = gql`
            query GetLeagueIds {
              leagueIds @client
            }
          `;
          const previous = cache.readQuery({ query });

          const data = {
            leagueIds: previous.leagueIds.concat([leagueId])
          };
          cache.writeData({ data });
        }
        return null;
      },
      removeLeagueId: (_, { leagueId }, { cache }) => {
        const query = gql`
          query GetLeagueIds {
            leagueIds @client
          }
        `;
        const previous = cache.readQuery({ query });

        const data = {
          leagueIds: previous.leagueIds.filter(id => id !== leagueId)
        };
        cache.writeData({ data });
        return null;
      }
    }
  },
  defaults: {
    leagueIds: []
  }
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, stateLink, httpLink]),
  cache
});

// needs to be declared after client otherwise there might be problems with defaults
export const persistor = new CachePersistor({
  storage: AsyncStorage,
  cache,
  debug: true
});
