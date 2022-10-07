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
  jsonb: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "games" */
export type Games = {
  __typename?: 'games';
  created_at: Scalars['timestamptz'];
  date: Scalars['timestamptz'];
  id: Scalars['String'];
  /** An object relationship */
  league: Leagues;
  league_id: Scalars['String'];
  scores: Scalars['jsonb'];
  /** An array relationship */
  teams: Array<Teams>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "games" */
export type GamesScoresArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "games" */
export type GamesTeamsArgs = {
  distinct_on?: InputMaybe<Array<Teams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Teams_Order_By>>;
  where?: InputMaybe<Teams_Bool_Exp>;
};

/** order by aggregate values of table "games" */
export type Games_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Games_Max_Order_By>;
  min?: InputMaybe<Games_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Games_Append_Input = {
  scores?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "games" */
export type Games_Arr_Rel_Insert_Input = {
  data: Array<Games_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Games_On_Conflict>;
};

/** Boolean expression to filter rows from the table "games". All fields are combined with a logical 'AND'. */
export type Games_Bool_Exp = {
  _and?: InputMaybe<Array<Games_Bool_Exp>>;
  _not?: InputMaybe<Games_Bool_Exp>;
  _or?: InputMaybe<Array<Games_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  date?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  league?: InputMaybe<Leagues_Bool_Exp>;
  league_id?: InputMaybe<String_Comparison_Exp>;
  scores?: InputMaybe<Jsonb_Comparison_Exp>;
  teams?: InputMaybe<Teams_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "games" */
export enum Games_Constraint {
  /** unique or primary key constraint */
  GamesPkey = 'games_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Games_Delete_At_Path_Input = {
  scores?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Games_Delete_Elem_Input = {
  scores?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Games_Delete_Key_Input = {
  scores?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "games" */
export type Games_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  date?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  league?: InputMaybe<Leagues_Obj_Rel_Insert_Input>;
  league_id?: InputMaybe<Scalars['String']>;
  scores?: InputMaybe<Scalars['jsonb']>;
  teams?: InputMaybe<Teams_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "games" */
export type Games_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  league_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "games" */
export type Games_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  league_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "games" */
export type Games_Mutation_Response = {
  __typename?: 'games_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Games>;
};

/** input type for inserting object relation for remote table "games" */
export type Games_Obj_Rel_Insert_Input = {
  data: Games_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Games_On_Conflict>;
};

/** on_conflict condition type for table "games" */
export type Games_On_Conflict = {
  constraint: Games_Constraint;
  update_columns?: Array<Games_Update_Column>;
  where?: InputMaybe<Games_Bool_Exp>;
};

/** Ordering options when selecting data from "games". */
export type Games_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  league?: InputMaybe<Leagues_Order_By>;
  league_id?: InputMaybe<Order_By>;
  scores?: InputMaybe<Order_By>;
  teams_aggregate?: InputMaybe<Teams_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: games */
export type Games_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Games_Prepend_Input = {
  scores?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "games" */
export enum Games_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  Id = 'id',
  /** column name */
  LeagueId = 'league_id',
  /** column name */
  Scores = 'scores',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "games" */
export type Games_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  date?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  league_id?: InputMaybe<Scalars['String']>;
  scores?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "games" */
export enum Games_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  Id = 'id',
  /** column name */
  LeagueId = 'league_id',
  /** column name */
  Scores = 'scores',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "leagues" */
export type Leagues = {
  __typename?: 'leagues';
  created_at: Scalars['timestamptz'];
  /** fetch data from the table: "games" */
  games: Array<Games>;
  id: Scalars['String'];
  /** An array relationship */
  players: Array<Players>;
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "leagues" */
export type LeaguesGamesArgs = {
  distinct_on?: InputMaybe<Array<Games_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Games_Order_By>>;
  where?: InputMaybe<Games_Bool_Exp>;
};


/** columns and relationships of "leagues" */
export type LeaguesPlayersArgs = {
  distinct_on?: InputMaybe<Array<Players_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Players_Order_By>>;
  where?: InputMaybe<Players_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "leagues". All fields are combined with a logical 'AND'. */
export type Leagues_Bool_Exp = {
  _and?: InputMaybe<Array<Leagues_Bool_Exp>>;
  _not?: InputMaybe<Leagues_Bool_Exp>;
  _or?: InputMaybe<Array<Leagues_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  games?: InputMaybe<Games_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  players?: InputMaybe<Players_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "leagues" */
export enum Leagues_Constraint {
  /** unique or primary key constraint */
  LeaguesPkey = 'leagues_pkey'
}

/** input type for inserting data into table "leagues" */
export type Leagues_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  games?: InputMaybe<Games_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['String']>;
  players?: InputMaybe<Players_Arr_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "leagues" */
export type Leagues_Mutation_Response = {
  __typename?: 'leagues_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Leagues>;
};

/** input type for inserting object relation for remote table "leagues" */
export type Leagues_Obj_Rel_Insert_Input = {
  data: Leagues_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Leagues_On_Conflict>;
};

/** on_conflict condition type for table "leagues" */
export type Leagues_On_Conflict = {
  constraint: Leagues_Constraint;
  update_columns?: Array<Leagues_Update_Column>;
  where?: InputMaybe<Leagues_Bool_Exp>;
};

/** Ordering options when selecting data from "leagues". */
export type Leagues_Order_By = {
  created_at?: InputMaybe<Order_By>;
  games_aggregate?: InputMaybe<Games_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  players_aggregate?: InputMaybe<Players_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: leagues */
export type Leagues_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "leagues" */
export enum Leagues_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "leagues" */
export type Leagues_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "leagues" */
export enum Leagues_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "games" */
  delete_games?: Maybe<Games_Mutation_Response>;
  /** delete single row from the table: "games" */
  delete_games_by_pk?: Maybe<Games>;
  /** delete data from the table: "leagues" */
  delete_leagues?: Maybe<Leagues_Mutation_Response>;
  /** delete single row from the table: "leagues" */
  delete_leagues_by_pk?: Maybe<Leagues>;
  /** delete data from the table: "players" */
  delete_players?: Maybe<Players_Mutation_Response>;
  /** delete single row from the table: "players" */
  delete_players_by_pk?: Maybe<Players>;
  /** delete data from the table: "teams" */
  delete_teams?: Maybe<Teams_Mutation_Response>;
  /** delete single row from the table: "teams" */
  delete_teams_by_pk?: Maybe<Teams>;
  /** insert data into the table: "games" */
  insert_games?: Maybe<Games_Mutation_Response>;
  /** insert a single row into the table: "games" */
  insert_games_one?: Maybe<Games>;
  /** insert data into the table: "leagues" */
  insert_leagues?: Maybe<Leagues_Mutation_Response>;
  /** insert a single row into the table: "leagues" */
  insert_leagues_one?: Maybe<Leagues>;
  /** insert data into the table: "players" */
  insert_players?: Maybe<Players_Mutation_Response>;
  /** insert a single row into the table: "players" */
  insert_players_one?: Maybe<Players>;
  /** insert data into the table: "teams" */
  insert_teams?: Maybe<Teams_Mutation_Response>;
  /** insert a single row into the table: "teams" */
  insert_teams_one?: Maybe<Teams>;
  /** update data of the table: "games" */
  update_games?: Maybe<Games_Mutation_Response>;
  /** update single row of the table: "games" */
  update_games_by_pk?: Maybe<Games>;
  /** update data of the table: "leagues" */
  update_leagues?: Maybe<Leagues_Mutation_Response>;
  /** update single row of the table: "leagues" */
  update_leagues_by_pk?: Maybe<Leagues>;
  /** update data of the table: "players" */
  update_players?: Maybe<Players_Mutation_Response>;
  /** update single row of the table: "players" */
  update_players_by_pk?: Maybe<Players>;
  /** update data of the table: "teams" */
  update_teams?: Maybe<Teams_Mutation_Response>;
  /** update single row of the table: "teams" */
  update_teams_by_pk?: Maybe<Teams>;
};


/** mutation root */
export type Mutation_RootDelete_GamesArgs = {
  where: Games_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Games_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_LeaguesArgs = {
  where: Leagues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Leagues_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_PlayersArgs = {
  where: Players_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Players_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_TeamsArgs = {
  where: Teams_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Teams_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_GamesArgs = {
  objects: Array<Games_Insert_Input>;
  on_conflict?: InputMaybe<Games_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Games_OneArgs = {
  object: Games_Insert_Input;
  on_conflict?: InputMaybe<Games_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LeaguesArgs = {
  objects: Array<Leagues_Insert_Input>;
  on_conflict?: InputMaybe<Leagues_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Leagues_OneArgs = {
  object: Leagues_Insert_Input;
  on_conflict?: InputMaybe<Leagues_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlayersArgs = {
  objects: Array<Players_Insert_Input>;
  on_conflict?: InputMaybe<Players_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Players_OneArgs = {
  object: Players_Insert_Input;
  on_conflict?: InputMaybe<Players_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TeamsArgs = {
  objects: Array<Teams_Insert_Input>;
  on_conflict?: InputMaybe<Teams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Teams_OneArgs = {
  object: Teams_Insert_Input;
  on_conflict?: InputMaybe<Teams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_GamesArgs = {
  _append?: InputMaybe<Games_Append_Input>;
  _delete_at_path?: InputMaybe<Games_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Games_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Games_Delete_Key_Input>;
  _prepend?: InputMaybe<Games_Prepend_Input>;
  _set?: InputMaybe<Games_Set_Input>;
  where: Games_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Games_By_PkArgs = {
  _append?: InputMaybe<Games_Append_Input>;
  _delete_at_path?: InputMaybe<Games_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Games_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Games_Delete_Key_Input>;
  _prepend?: InputMaybe<Games_Prepend_Input>;
  _set?: InputMaybe<Games_Set_Input>;
  pk_columns: Games_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_LeaguesArgs = {
  _set?: InputMaybe<Leagues_Set_Input>;
  where: Leagues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Leagues_By_PkArgs = {
  _set?: InputMaybe<Leagues_Set_Input>;
  pk_columns: Leagues_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PlayersArgs = {
  _set?: InputMaybe<Players_Set_Input>;
  where: Players_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Players_By_PkArgs = {
  _set?: InputMaybe<Players_Set_Input>;
  pk_columns: Players_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TeamsArgs = {
  _inc?: InputMaybe<Teams_Inc_Input>;
  _set?: InputMaybe<Teams_Set_Input>;
  where: Teams_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_By_PkArgs = {
  _inc?: InputMaybe<Teams_Inc_Input>;
  _set?: InputMaybe<Teams_Set_Input>;
  pk_columns: Teams_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "players" */
export type Players = {
  __typename?: 'players';
  created_at: Scalars['timestamptz'];
  id: Scalars['String'];
  /** An object relationship */
  league: Leagues;
  league_id: Scalars['String'];
  name: Scalars['String'];
  /** An array relationship */
  teams: Array<Teams>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "players" */
export type PlayersTeamsArgs = {
  distinct_on?: InputMaybe<Array<Teams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Teams_Order_By>>;
  where?: InputMaybe<Teams_Bool_Exp>;
};

/** order by aggregate values of table "players" */
export type Players_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Players_Max_Order_By>;
  min?: InputMaybe<Players_Min_Order_By>;
};

/** input type for inserting array relation for remote table "players" */
export type Players_Arr_Rel_Insert_Input = {
  data: Array<Players_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Players_On_Conflict>;
};

/** Boolean expression to filter rows from the table "players". All fields are combined with a logical 'AND'. */
export type Players_Bool_Exp = {
  _and?: InputMaybe<Array<Players_Bool_Exp>>;
  _not?: InputMaybe<Players_Bool_Exp>;
  _or?: InputMaybe<Array<Players_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  league?: InputMaybe<Leagues_Bool_Exp>;
  league_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  teams?: InputMaybe<Teams_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "players" */
export enum Players_Constraint {
  /** unique or primary key constraint */
  PlayersNameLeagueIdUnique = 'players_name_league_id_unique',
  /** unique or primary key constraint */
  PlayersPkey = 'players_pkey'
}

/** input type for inserting data into table "players" */
export type Players_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  league?: InputMaybe<Leagues_Obj_Rel_Insert_Input>;
  league_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  teams?: InputMaybe<Teams_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "players" */
export type Players_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  league_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "players" */
export type Players_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  league_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "players" */
export type Players_Mutation_Response = {
  __typename?: 'players_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Players>;
};

/** input type for inserting object relation for remote table "players" */
export type Players_Obj_Rel_Insert_Input = {
  data: Players_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Players_On_Conflict>;
};

/** on_conflict condition type for table "players" */
export type Players_On_Conflict = {
  constraint: Players_Constraint;
  update_columns?: Array<Players_Update_Column>;
  where?: InputMaybe<Players_Bool_Exp>;
};

/** Ordering options when selecting data from "players". */
export type Players_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  league?: InputMaybe<Leagues_Order_By>;
  league_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  teams_aggregate?: InputMaybe<Teams_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: players */
export type Players_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "players" */
export enum Players_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LeagueId = 'league_id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "players" */
export type Players_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  league_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "players" */
export enum Players_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LeagueId = 'league_id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "games" */
  games: Array<Games>;
  /** fetch data from the table: "games" using primary key columns */
  games_by_pk?: Maybe<Games>;
  /** fetch data from the table: "leagues" */
  leagues: Array<Leagues>;
  /** fetch data from the table: "leagues" using primary key columns */
  leagues_by_pk?: Maybe<Leagues>;
  /** An array relationship */
  players: Array<Players>;
  /** fetch data from the table: "players" using primary key columns */
  players_by_pk?: Maybe<Players>;
  /** An array relationship */
  teams: Array<Teams>;
  /** fetch data from the table: "teams" using primary key columns */
  teams_by_pk?: Maybe<Teams>;
};


export type Query_RootGamesArgs = {
  distinct_on?: InputMaybe<Array<Games_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Games_Order_By>>;
  where?: InputMaybe<Games_Bool_Exp>;
};


export type Query_RootGames_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootLeaguesArgs = {
  distinct_on?: InputMaybe<Array<Leagues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leagues_Order_By>>;
  where?: InputMaybe<Leagues_Bool_Exp>;
};


export type Query_RootLeagues_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootPlayersArgs = {
  distinct_on?: InputMaybe<Array<Players_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Players_Order_By>>;
  where?: InputMaybe<Players_Bool_Exp>;
};


export type Query_RootPlayers_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootTeamsArgs = {
  distinct_on?: InputMaybe<Array<Teams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Teams_Order_By>>;
  where?: InputMaybe<Teams_Bool_Exp>;
};


export type Query_RootTeams_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "games" */
  games: Array<Games>;
  /** fetch data from the table: "games" using primary key columns */
  games_by_pk?: Maybe<Games>;
  /** fetch data from the table: "leagues" */
  leagues: Array<Leagues>;
  /** fetch data from the table: "leagues" using primary key columns */
  leagues_by_pk?: Maybe<Leagues>;
  /** An array relationship */
  players: Array<Players>;
  /** fetch data from the table: "players" using primary key columns */
  players_by_pk?: Maybe<Players>;
  /** An array relationship */
  teams: Array<Teams>;
  /** fetch data from the table: "teams" using primary key columns */
  teams_by_pk?: Maybe<Teams>;
};


export type Subscription_RootGamesArgs = {
  distinct_on?: InputMaybe<Array<Games_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Games_Order_By>>;
  where?: InputMaybe<Games_Bool_Exp>;
};


export type Subscription_RootGames_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootLeaguesArgs = {
  distinct_on?: InputMaybe<Array<Leagues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leagues_Order_By>>;
  where?: InputMaybe<Leagues_Bool_Exp>;
};


export type Subscription_RootLeagues_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootPlayersArgs = {
  distinct_on?: InputMaybe<Array<Players_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Players_Order_By>>;
  where?: InputMaybe<Players_Bool_Exp>;
};


export type Subscription_RootPlayers_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootTeamsArgs = {
  distinct_on?: InputMaybe<Array<Teams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Teams_Order_By>>;
  where?: InputMaybe<Teams_Bool_Exp>;
};


export type Subscription_RootTeams_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "teams" */
export type Teams = {
  __typename?: 'teams';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  game: Games;
  game_id: Scalars['String'];
  id: Scalars['Int'];
  /** An object relationship */
  player: Players;
  player_id: Scalars['String'];
  team_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};

/** order by aggregate values of table "teams" */
export type Teams_Aggregate_Order_By = {
  avg?: InputMaybe<Teams_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Teams_Max_Order_By>;
  min?: InputMaybe<Teams_Min_Order_By>;
  stddev?: InputMaybe<Teams_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Teams_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Teams_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Teams_Sum_Order_By>;
  var_pop?: InputMaybe<Teams_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Teams_Var_Samp_Order_By>;
  variance?: InputMaybe<Teams_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "teams" */
export type Teams_Arr_Rel_Insert_Input = {
  data: Array<Teams_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Teams_On_Conflict>;
};

/** order by avg() on columns of table "teams" */
export type Teams_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "teams". All fields are combined with a logical 'AND'. */
export type Teams_Bool_Exp = {
  _and?: InputMaybe<Array<Teams_Bool_Exp>>;
  _not?: InputMaybe<Teams_Bool_Exp>;
  _or?: InputMaybe<Array<Teams_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  game?: InputMaybe<Games_Bool_Exp>;
  game_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  player?: InputMaybe<Players_Bool_Exp>;
  player_id?: InputMaybe<String_Comparison_Exp>;
  team_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "teams" */
export enum Teams_Constraint {
  /** unique or primary key constraint */
  TeamsPkey = 'teams_pkey'
}

/** input type for incrementing numeric columns in table "teams" */
export type Teams_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  team_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "teams" */
export type Teams_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  game?: InputMaybe<Games_Obj_Rel_Insert_Input>;
  game_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  player?: InputMaybe<Players_Obj_Rel_Insert_Input>;
  player_id?: InputMaybe<Scalars['String']>;
  team_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "teams" */
export type Teams_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  game_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  player_id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "teams" */
export type Teams_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  game_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  player_id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "teams" */
export type Teams_Mutation_Response = {
  __typename?: 'teams_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Teams>;
};

/** on_conflict condition type for table "teams" */
export type Teams_On_Conflict = {
  constraint: Teams_Constraint;
  update_columns?: Array<Teams_Update_Column>;
  where?: InputMaybe<Teams_Bool_Exp>;
};

/** Ordering options when selecting data from "teams". */
export type Teams_Order_By = {
  created_at?: InputMaybe<Order_By>;
  game?: InputMaybe<Games_Order_By>;
  game_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  player?: InputMaybe<Players_Order_By>;
  player_id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: teams */
export type Teams_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "teams" */
export enum Teams_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GameId = 'game_id',
  /** column name */
  Id = 'id',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "teams" */
export type Teams_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  game_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  player_id?: InputMaybe<Scalars['String']>;
  team_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** order by stddev() on columns of table "teams" */
export type Teams_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "teams" */
export type Teams_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "teams" */
export type Teams_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "teams" */
export type Teams_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** update columns of table "teams" */
export enum Teams_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GameId = 'game_id',
  /** column name */
  Id = 'id',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** order by var_pop() on columns of table "teams" */
export type Teams_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "teams" */
export type Teams_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "teams" */
export type Teams_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type CreateGameMutationVariables = Exact<{
  leagueId: Scalars['String'];
  date: Scalars['timestamptz'];
  teamIds?: InputMaybe<Array<Teams_Insert_Input> | Teams_Insert_Input>;
  scores?: InputMaybe<Scalars['jsonb']>;
}>;


export type CreateGameMutation = { __typename?: 'mutation_root', insert_games_one?: { __typename?: 'games', id: string } | null };

export type CreateLeagueMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateLeagueMutation = { __typename?: 'mutation_root', insert_leagues_one?: { __typename?: 'leagues', id: string } | null };

export type CreatePlayerMutationVariables = Exact<{
  name: Scalars['String'];
  leagueId: Scalars['String'];
}>;


export type CreatePlayerMutation = { __typename?: 'mutation_root', insert_players_one?: { __typename?: 'players', id: string, name: string } | null };

export type DeleteGameMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGameMutation = { __typename?: 'mutation_root', delete_games_by_pk?: { __typename?: 'games', id: string } | null };

export type DeletePlayerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePlayerMutation = { __typename?: 'mutation_root', delete_players_by_pk?: { __typename?: 'players', name: string } | null };

export type LeagueQueryVariables = Exact<{
  leagueId: Scalars['String'];
}>;


export type LeagueQuery = { __typename?: 'query_root', leagues_by_pk?: { __typename?: 'leagues', id: string, title: string, players: Array<{ __typename?: 'players', id: string, name: string }>, games: Array<{ __typename?: 'games', id: string, date: any, scores: any, teams: Array<{ __typename?: 'teams', team_id: number, player: { __typename?: 'players', id: string, name: string } }> }> } | null };

export type LeaguesQueryVariables = Exact<{
  leagueIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type LeaguesQuery = { __typename?: 'query_root', leagues: Array<{ __typename?: 'leagues', id: string, title: string, players: Array<{ __typename?: 'players', id: string, name: string }>, games: Array<{ __typename?: 'games', id: string, date: any, scores: any, teams: Array<{ __typename?: 'teams', player: { __typename?: 'players', id: string, name: string } }> }> }> };


export const CreateGameDocument = `
    mutation CreateGame($leagueId: String!, $date: timestamptz!, $teamIds: [teams_insert_input!] = {}, $scores: jsonb = "") {
  insert_games_one(
    object: {league_id: $leagueId, date: $date, teams: {data: $teamIds}, scores: $scores}
  ) {
    id
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
  insert_leagues_one(object: {title: $title}) {
    id
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
export const CreatePlayerDocument = `
    mutation createPlayer($name: String!, $leagueId: String!) {
  insert_players_one(object: {name: $name, league_id: $leagueId}) {
    id
    name
  }
}
    `;
export const useCreatePlayerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePlayerMutation, TError, CreatePlayerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePlayerMutation, TError, CreatePlayerMutationVariables, TContext>(
      ['createPlayer'],
      (variables?: CreatePlayerMutationVariables) => fetcher<CreatePlayerMutation, CreatePlayerMutationVariables>(client, CreatePlayerDocument, variables, headers)(),
      options
    );
export const DeleteGameDocument = `
    mutation deleteGame($id: String!) {
  delete_games_by_pk(id: $id) {
    id
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
  delete_players_by_pk(id: $id) {
    name
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
  leagues_by_pk(id: $leagueId) {
    id
    title
    players {
      id
      name
    }
    games {
      id
      date
      scores
      teams {
        team_id
        player {
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
    query Leagues($leagueIds: [String!]) {
  leagues(where: {id: {_in: $leagueIds}}) {
    id
    title
    players {
      id
      name
    }
    games {
      id
      date
      scores
      teams {
        player {
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
      variables?: LeaguesQueryVariables,
      options?: UseQueryOptions<LeaguesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LeaguesQuery, TError, TData>(
      variables === undefined ? ['Leagues'] : ['Leagues', variables],
      fetcher<LeaguesQuery, LeaguesQueryVariables>(client, LeaguesDocument, variables, headers),
      options
    );