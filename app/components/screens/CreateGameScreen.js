import React from "react";
import { ActivityIndicator, Alert } from "react-native";

import CreateGameMutation from "../graphql/CreateGameMutation";
import CreateGameForm from "../base/CreateGameForm";
import { ModalBackground } from "../elements";

class CreateGameScreen extends React.Component {
  static navigationOptions = {
    title: "Create Game",
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomWidth: 0,
      elevation: 0
    }
  };

  render() {
    const leagueId = this.props.navigation.state.params.leagueId;
    return (
      <CreateGameMutation
        leagueId={leagueId}
        onCompleted={() => this.props.navigation.goBack()}
      >
        {(createGame, { data, loading }) => {
          let content;
          if (loading) {
            content = <ActivityIndicator />;
          } else {
            content = (
              <CreateGameForm
                players={this.props.navigation.state.params.players}
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
}

export default CreateGameScreen;
