import { Alert } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";

import graphqlClient from "../graphql/graphqlClient";
import {
  useDeletePlayerMutation,
  useLeagueQuery,
  DeletePlayerMutation
} from "../graphql/generated";

interface useDeletePlayerOptions {
  onSuccess?: (data: DeletePlayerMutation, variables: { id: string }) => void;
}

export const useDeletePlayer = (
  leagueId: string,
  options?: useDeletePlayerOptions
) => {
  const { refetch } = useLeagueQuery(
    graphqlClient,
    { leagueId },
    { enabled: false }
  );

  const { mutate } = useDeletePlayerMutation(graphqlClient, {
    onSuccess: (data, variables) => {
      Amplitude.logEventWithPropertiesAsync("DeletePlayer", {
        playerId: variables.id,
        leagueId
      });
      refetch();
      if (options && options.onSuccess) {
        options.onSuccess(data, variables);
      }
    }
  });

  const deletePlayer = ({ id }) => {
    Alert.alert("Delete Player?", "Do you really want to delete this player?", [
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

  return { deletePlayer };
};
