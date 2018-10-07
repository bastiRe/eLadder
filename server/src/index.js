import { ApolloServer } from "apollo-server";
// include and initialize the rollbar library with your access token
import Raven from "raven";

import schema from "./schema";
import "./db";

const port = process.env.PORT;

let formatError = graphqlError => graphqlError;

if (process.env.SENTRY_DSN) {
  Raven.config(process.env.SENTRY_DSN).install();

  formatError = graphqlError => {
    Raven.captureException(graphqlError.originalError);
    return graphqlError;
  };
}

const engine = process.env.APOLLO_ENGINE_KEY
  ? {
      apiKey: process.env.APOLLO_ENGINE_KEY
    }
  : undefined;

const graphQLServer = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  formatError,
  engine
});

graphQLServer.listen(port).then(() => console.log(`Server is running`));
