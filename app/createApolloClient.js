import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import * as SecureStore from "expo-secure-store";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { endpointUrl } from "./constants/Environment";
import * as Sentry from "sentry-expo";

const httpLink = createHttpLink({
  uri: endpointUrl
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(error => {
      Sentry.Browser.captureException(error);
      console.log(
        `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
      );
    });

  if (networkError) {
    Sentry.Browser.captureException(networkError);
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

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache
});
