import React from "react";
import { ActivityIndicator, Alert } from "react-native";

import graphqlClient from "../../graphql/graphqlClient";
import { useCreateGameMutation, useLeagueQuery } from "../../graphql/generated";
import CreateGameForm from "../base/CreateGameForm";
import { ModalBackground } from "../elements";

function CreateGameScreen({ route, navigation }) {
  const leagueId = route.params.leagueId;
  const { refetch } = useLeagueQuery(graphqlClient, { leagueId });
  const { isLoading, mutate } = useCreateGameMutation(graphqlClient, {
    onSuccess: () => {
      refetch();
      navigation.goBack();
    },
    onError: e => Alert.alert(e.message.replace("GraphQL error: ", ""))
  });

  let content;
  if (isLoading) {
    content = <ActivityIndicator />;
  } else {
    content = (
      <CreateGameForm
        players={route.params.players}
        onSubmit={({ teamIds, date }) => {
          mutate({
            teamIds,
            leagueId,
            date
          });
        }}
      />
    );
  }
  return <ModalBackground>{content}</ModalBackground>;
}

export default CreateGameScreen;
