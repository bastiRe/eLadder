import React from "react";
import { Mutation } from "react-apollo";
import * as Amplitude from 'expo-analytics-amplitude';

import CREATE_GAME from "../../graphql/CreateGame";
import LEAGUE from "../../graphql/League";

const CreateGameMutation = ({ children, onCompleted, leagueId }) => {
  const wrappedOnCompleted = data => {
    Amplitude.logEventWithPropertiesAsync("CreateGame", { leagueId });
    return onCompleted(data);
  };

  return (
    <Mutation
      mutation={CREATE_GAME}
      refetchQueries={[{ query: LEAGUE, variables: { leagueId } }]}
      onCompleted={wrappedOnCompleted}
    >
      {(createGame, options) => {
        const wrappedCreateGame = async ({ teamIds, leagueId, date }) => {
          return createGame({ variables: { teamIds, leagueId, date } });
        };

        return children(wrappedCreateGame, options);
      }}
    </Mutation>
  );
};

export default CreateGameMutation;
