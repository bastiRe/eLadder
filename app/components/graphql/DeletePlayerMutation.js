import { Alert } from "react-native";
import React from "react";
import { Mutation } from "react-apollo";
import { Amplitude } from "expo";

import LEAGUE from "../../graphql/League";
import DELETE_PLAYER from "../../graphql/DeletePlayer";

const DeletePlayerMutation = ({ player, children, leagueId }) => {
  return (
    <Mutation
      mutation={DELETE_PLAYER}
      refetchQueries={[{ query: LEAGUE, variables: { leagueId } }]}
    >
      {(deletePlayer, { loading }) => {
        const deletePlayerHandler = () =>
          new Promise(resolve => {
            Alert.alert(
              "Delete Player?",
              "Do you really want to delete this player?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => resolve(false)
                },
                {
                  text: "OK",
                  onPress: async () => {
                    await deletePlayer({ variables: { id: player.id } });
                    Amplitude.logEventWithProperties("DeleteGame", {
                      playerId: player.id,
                      leagueId
                    });
                    resolve(true);
                  }
                }
              ]
            );
          });
        return children({ deletePlayerHandler, loading });
      }}
    </Mutation>
  );
};

export default DeletePlayerMutation;
