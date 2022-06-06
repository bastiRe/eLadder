import React from "react";
import { ActivityIndicator } from "react-native";

import CreateLeagueForm from "../base/CreateLeagueForm";
import CreateLeagueMutation from "../graphql/CreateLeagueMutation";
import { useLeagueIds } from "../../context/LeagueIds";
import { ModalBackground } from "../elements";

function CreateLeagueScreen({ navigation }) {
  const { addLeagueId } = useLeagueIds();
  return (
    <CreateLeagueMutation
      onCompleted={data => {
        const leagueId = data.createLeague.league.id;
        addLeagueId(leagueId);
        navigation.goBack();
      }}
    >
      {(createLeague, { loading }) => {
        let content;

        if (loading) {
          content = <ActivityIndicator />;
        } else {
          content = (
            <CreateLeagueForm
              onSubmit={({ title }) => createLeague({ title })}
            />
          );
        }
        return <ModalBackground>{content}</ModalBackground>;
      }}
    </CreateLeagueMutation>
  );
}

export default CreateLeagueScreen;
