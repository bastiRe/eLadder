import React from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { Amplitude } from "expo";
import { Mutation } from "react-apollo";
import LEAGUE from "../../graphql/League";
import CREATE_GAME from "../../graphql/CreateGame";
import CreateGameForm from "../base/CreateGameForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    elevation: 0
  }
});

class CreateGameScreen extends React.Component {
  static navigationOptions = {
    title: "Create Game",
    headerStyle: styles.header
  };

  render() {
    const leagueId = this.props.navigation.state.params.leagueId;
    return (
      <Mutation
        mutation={CREATE_GAME}
        refetchQueries={[{ query: LEAGUE, variables: { leagueId } }]}
        onCompleted={() => {
          this.props.navigation.goBack();
          Amplitude.logEventWithProperties("CreateGame", { leagueId });
        }}
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
                      variables: {
                        teamIds,
                        leagueId,
                        date
                      }
                    });
                  } catch (e) {
                    Alert.alert(e.message.replace("GraphQL error: ", ""));
                  }
                }}
              />
            );
          }
          return <View style={styles.container}>{content}</View>;
        }}
      </Mutation>
    );
  }
}

export default CreateGameScreen;
