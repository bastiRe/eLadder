import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Game = {
  __typename?: 'Game';
  date: Scalars['String'];
  id: Scalars['String'];
  league?: Maybe<League>;
  teams: Array<Maybe<Team>>;
};

export type League = {
  __typename?: 'League';
  games?: Maybe<Array<Maybe<Game>>>;
  id: Scalars['String'];
  players?: Maybe<Array<Maybe<Player>>>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame?: Maybe<CreateGameResponse>;
  createLeague?: Maybe<CreateLeagueResponse>;
  createPlayer?: Maybe<CreatePlayerResponse>;
  deleteGame?: Maybe<DeleteGameResponse>;
  deletePlayer?: Maybe<DeletePlayerResponse>;
};


export type MutationCreateGameArgs = {
  date: Scalars['String'];
  leagueId: Scalars['String'];
  teamIds: Array<InputMaybe<TeamIds>>;
};


export type MutationCreateLeagueArgs = {
  title: Scalars['String'];
};


export type MutationCreatePlayerArgs = {
  leagueId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteGameArgs = {
  id: Scalars['String'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['String'];
};

export type Player = {
  __typename?: 'Player';
  games?: Maybe<Array<Maybe<Game>>>;
  id: Scalars['String'];
  league?: Maybe<League>;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  league?: Maybe<League>;
  leagues?: Maybe<Array<Maybe<League>>>;
};


export type QueryLeagueArgs = {
  id: Scalars['String'];
};


export type QueryLeaguesArgs = {
  ids: Array<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  players: Array<Maybe<Player>>;
  score: Scalars['Int'];
};

export type TeamIds = {
  playerIds?: InputMaybe<Array<Scalars['String']>>;
  score: Scalars['Int'];
};

export type CreateGameResponse = {
  __typename?: 'createGameResponse';
  game?: Maybe<Game>;
};

export type CreateLeagueResponse = {
  __typename?: 'createLeagueResponse';
  league?: Maybe<League>;
};

export type CreatePlayerResponse = {
  __typename?: 'createPlayerResponse';
  player?: Maybe<Player>;
};

export type DeleteGameResponse = {
  __typename?: 'deleteGameResponse';
  success?: Maybe<Scalars['Boolean']>;
};

export type DeletePlayerResponse = {
  __typename?: 'deletePlayerResponse';
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateGameMutationVariables = Exact<{
  leagueId: Scalars['String'];
  teamIds: Array<InputMaybe<TeamIds>> | InputMaybe<TeamIds>;
  date: Scalars['String'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame?: { __typename?: 'createGameResponse', game?: { __typename?: 'Game', id: string } | null } | null };

export type CreateLeagueMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateLeagueMutation = { __typename?: 'Mutation', createLeague?: { __typename?: 'createLeagueResponse', league?: { __typename?: 'League', id: string } | null } | null };

export type DeleteGameMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGameMutation = { __typename?: 'Mutation', deleteGame?: { __typename?: 'deleteGameResponse', success?: boolean | null } | null };

export type DeletePlayerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePlayerMutation = { __typename?: 'Mutation', deletePlayer?: { __typename?: 'deletePlayerResponse', success?: boolean | null } | null };

export type LeagueQueryVariables = Exact<{
  leagueId: Scalars['String'];
}>;


export type LeagueQuery = { __typename?: 'Query', league?: { __typename?: 'League', id: string, title: string, players?: Array<{ __typename?: 'Player', id: string, name: string } | null> | null, games?: Array<{ __typename?: 'Game', id: string, date: string, teams: Array<{ __typename?: 'Team', score: number, players: Array<{ __typename?: 'Player', id: string, name: string } | null> } | null> } | null> | null } | null };

export type LeaguesQueryVariables = Exact<{
  leagueIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type LeaguesQuery = { __typename?: 'Query', leagues?: Array<{ __typename?: 'League', id: string, title: string, players?: Array<{ __typename?: 'Player', id: string, name: string } | null> | null, games?: Array<{ __typename?: 'Game', id: string, date: string, teams: Array<{ __typename?: 'Team', score: number, players: Array<{ __typename?: 'Player', id: string, name: string } | null> } | null> } | null> | null } | null> | null };


export const CreateGameDocument = `
    mutation CreateGame($leagueId: String!, $teamIds: [TeamIds]!, $date: String!) {
  createGame(leagueId: $leagueId, teamIds: $teamIds, date: $date) {
    game {
      id
    }
  }
}
    `;
export const useCreateGameMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateGameMutation, TError, CreateGameMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateGameMutation, TError, CreateGameMutationVariables, TContext>(
      ['CreateGame'],
      (variables?: CreateGameMutationVariables) => fetcher<CreateGameMutation, CreateGameMutationVariables>(client, CreateGameDocument, variables, headers)(),
      options
    );
export const CreateLeagueDocument = `
    mutation CreateLeague($title: String!) {
  createLeague(title: $title) {
    league {
      id
    }
  }
}
    `;
export const useCreateLeagueMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateLeagueMutation, TError, CreateLeagueMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateLeagueMutation, TError, CreateLeagueMutationVariables, TContext>(
      ['CreateLeague'],
      (variables?: CreateLeagueMutationVariables) => fetcher<CreateLeagueMutation, CreateLeagueMutationVariables>(client, CreateLeagueDocument, variables, headers)(),
      options
    );
export const DeleteGameDocument = `
    mutation deleteGame($id: String!) {
  deleteGame(id: $id) {
    success
  }
}
    `;
export const useDeleteGameMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteGameMutation, TError, DeleteGameMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteGameMutation, TError, DeleteGameMutationVariables, TContext>(
      ['deleteGame'],
      (variables?: DeleteGameMutationVariables) => fetcher<DeleteGameMutation, DeleteGameMutationVariables>(client, DeleteGameDocument, variables, headers)(),
      options
    );
export const DeletePlayerDocument = `
    mutation deletePlayer($id: String!) {
  deletePlayer(id: $id) {
    success
  }
}
    `;
export const useDeletePlayerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePlayerMutation, TError, DeletePlayerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePlayerMutation, TError, DeletePlayerMutationVariables, TContext>(
      ['deletePlayer'],
      (variables?: DeletePlayerMutationVariables) => fetcher<DeletePlayerMutation, DeletePlayerMutationVariables>(client, DeletePlayerDocument, variables, headers)(),
      options
    );
export const LeagueDocument = `
    query League($leagueId: String!) {
  league(id: $leagueId) {
    id
    title
    players {
      id
      name
    }
    games {
      id
      date
      teams {
        score
        players {
          id
          name
        }
      }
    }
  }
}
    `;
export const useLeagueQuery = <
      TData = LeagueQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: LeagueQueryVariables,
      options?: UseQueryOptions<LeagueQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LeagueQuery, TError, TData>(
      ['League', variables],
      fetcher<LeagueQuery, LeagueQueryVariables>(client, LeagueDocument, variables, headers),
      options
    );
export const LeaguesDocument = `
    query Leagues($leagueIds: [String!]!) {
  leagues(ids: $leagueIds) {
    id
    title
    players {
      id
      name
    }
    games {
      id
      date
      teams {
        score
        players {
          id
          name
        }
      }
    }
  }
}
    `;
export const useLeaguesQuery = <
      TData = LeaguesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: LeaguesQueryVariables,
      options?: UseQueryOptions<LeaguesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LeaguesQuery, TError, TData>(
      ['Leagues', variables],
      fetcher<LeaguesQuery, LeaguesQueryVariables>(client, LeaguesDocument, variables, headers),
      options
    );