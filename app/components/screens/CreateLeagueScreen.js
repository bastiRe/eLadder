import React from "react";
import { ActivityIndicator } from "react-native";

import CreateLeagueForm from "../base/CreateLeagueForm";
import CreateLeagueMutation from "../graphql/CreateLeagueMutation";
import AddLeagueIdMutation from "../graphql/AddLeagueIdMutation";
import { ModalBackground } from "../elements";

function CreateLeagueScreen({ navigation }) {
  return (
    <AddLeagueIdMutation onCompleted={() => navigation.goBack()}>
      {(addLeagueId, options) => (
        <CreateLeagueMutation
          onCompleted={data => {
            const leagueId = data.createLeague.league.id;
            addLeagueId({ leagueId });
          }}
        >
          {(createLeague, { loading }) => {
            let content;

            if (loading || options.loading) {
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
      )}
    </AddLeagueIdMutation>
  );
}

export default CreateLeagueScreen;
