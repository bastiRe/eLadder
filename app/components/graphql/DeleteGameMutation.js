import { Alert } from "react-native";
import React from "react";
import { Mutation } from "react-apollo";
import * as Amplitude from 'expo-analytics-amplitude';

import LEAGUE from "../../graphql/League";
import DELETE_GAME from "../../graphql/DeleteGame";

const DeleteGameMutation = ({ game, children, leagueId }) => {
  return (
    <Mutation
      mutation={DELETE_GAME}
      refetchQueries={[{ query: LEAGUE, variables: { leagueId } }]}
    >
      {(deleteGame, { loading }) => {
        const deleteGameHandler = () =>
          new Promise(resolve => {
            Alert.alert(
              "Delete Game?",
              "Do you really want to delete this game?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => resolve(false)
                },
                {
                  text: "OK",
                  onPress: async () => {
                    await deleteGame({ variables: { id: game.id } });
                    Amplitude.logEventWithProperties("DeleteGame", {
                      gameId: game.id,
                      leagueId
                    });
                    resolve(true);
                  }
                }
              ]
            );
          });
        return children({ deleteGameHandler, loading });
      }}
    </Mutation>
  );
};

export default DeleteGameMutation;
