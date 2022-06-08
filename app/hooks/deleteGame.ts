import { Alert } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";

import graphqlClient from "../graphql/graphqlClient";
import {
  useDeleteGameMutation,
  useLeagueQuery,
  DeleteGameMutation
} from "../graphql/generated";

interface useDeleteGameOptions {
  onSuccess?: (data: DeleteGameMutation, variables: { id: string }) => void;
}

export const useDeleteGame = (
  leagueId: string,
  options?: useDeleteGameOptions
) => {
  const { refetch } = useLeagueQuery(
    graphqlClient,
    { leagueId },
    { enabled: false }
  );

  const { mutate } = useDeleteGameMutation(graphqlClient, {
    onSuccess: (data, variables) => {
      Amplitude.logEventWithPropertiesAsync("DeleteGame", {
        gameId: variables.id,
        leagueId
      });
      refetch();
      if (options && options.onSuccess) {
        options.onSuccess(data, variables);
      }
    }
  });

  const deleteGame = ({ id }) => {
    Alert.alert("Delete Game?", "Do you really want to delete this game?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => mutate({ id })
      }
    ]);
  };

  return { deleteGame };
};
