# eLadder Server

This server is built using ApolloServer and uses docker for local development and deployment.

## Development

- Run `yarn install` to install missing dependencies
- See https://docs.docker.com/get-started/ and https://docs.docker.com/compose/gettingstarted/ to install and get started with docker / docker-compose
- Run `docker-compose up` in the server directory to launch the server and database. The API is available at http://localhost:3000 and the GraphQL playground at http://localhost:3000/playground
- Run `yarn knex migrate:latest` to prepare the database.

## Deployment

TODO
