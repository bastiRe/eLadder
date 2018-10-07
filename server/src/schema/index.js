import { gql } from "apollo-server";
import resolvers from "./resolvers";

const typeDefs = gql`
  type League {
    id: String!
    title: String!
    games: [Game]
    players: [Player]
  }

  type Player {
    id: String!
    name: String!
    games: [Game]
    league: League
  }

  type Team {
    players: [Player]!
    score: Int!
  }

  type Game {
    id: String!
    teams: [Team]!
    date: String!
    league: League
  }

  type Query {
    league(id: String!): League
    leagues(ids: [String!]!): [League]
  }

  input TeamIds {
    playerIds: [String!]
    score: Int!
  }

  type createLeagueResponse {
    league: League
  }

  type createPlayerResponse {
    player: Player
  }

  type deletePlayerResponse {
    success: Boolean
  }

  type createGameResponse {
    game: Game
  }

  type deleteGameResponse {
    success: Boolean
  }

  type Mutation {
    createLeague(title: String!): createLeagueResponse
    createPlayer(leagueId: String!, name: String!): createPlayerResponse
    deletePlayer(id: String!): deletePlayerResponse
    createGame(
      leagueId: String!
      teamIds: [TeamIds]!
      date: String!
    ): createGameResponse
    deleteGame(id: String!): deleteGameResponse
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default {
  typeDefs,
  resolvers
};
