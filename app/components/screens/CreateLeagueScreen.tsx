import React from "react";
import { ActivityIndicator } from "react-native";

import graphqlClient from "../../graphql/graphqlClient";
import { useCreateLeagueMutation } from "../../graphql/generated";
import CreateLeagueForm from "../base/CreateLeagueForm";
import { useLeagueIds } from "../../context/LeagueIds";
import { ModalBackground } from "../elements";

function CreateLeagueScreen({ navigation }) {
  const { addLeagueId } = useLeagueIds();
  const { isLoading, mutate } = useCreateLeagueMutation(graphqlClient, {
    onSuccess: ({ createLeague }) => {
      const leagueId = createLeague.league.id;
      addLeagueId(leagueId);
      navigation.goBack();
    }
  });
  let content;

  if (isLoading) {
    content = <ActivityIndicator />;
  } else {
    content = <CreateLeagueForm onSubmit={({ title }) => mutate({ title })} />;
  }

  return <ModalBackground>{content}</ModalBackground>;
}

export default CreateLeagueScreen;
