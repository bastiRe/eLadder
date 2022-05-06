import React from "react";
import { ActivityIndicator, Alert } from "react-native";

import CreateGameMutation from "../graphql/CreateGameMutation";
import CreateGameForm from "../base/CreateGameForm";
import { ModalBackground } from "../elements";

function CreateGameScreen({ route, navigation }) {
  const leagueId = route.params.leagueId;
  return (
    <CreateGameMutation
      leagueId={leagueId}
      onCompleted={() => navigation.goBack()}
    >
      {(createGame, { loading }) => {
        let content;
        if (loading) {
          content = <ActivityIndicator />;
        } else {
          content = (
            <CreateGameForm
              players={route.params.players}
              onSubmit={async ({ teamIds, date }) => {
                try {
                  await createGame({
                    teamIds,
                    leagueId,
                    date
                  });
                } catch (e) {
                  Alert.alert(e.message.replace("GraphQL error: ", ""));
                }
              }}
            />
          );
        }
        return <ModalBackground>{content}</ModalBackground>;
      }}
    </CreateGameMutation>
  );
}

export default CreateGameScreen;
