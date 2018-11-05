import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

import CreateLeagueForm from "../base/CreateLeagueForm";
import CreateLeagueMutation from "../graphql/CreateLeagueMutation";
import AddLeagueIdMutation from "../graphql/AddLeagueIdMutation";
import { ModalBackground } from "../elements";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    elevation: 0
  }
});

class CreateLeagueScreen extends React.Component {
  static navigationOptions = {
    title: "Create League",
    headerStyle: styles.header
  };

  render() {
    return (
      <AddLeagueIdMutation onCompleted={() => this.props.navigation.goBack()}>
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
              return (
                <ModalBackground style={styles.container}>
                  {content}
                </ModalBackground>
              );
            }}
          </CreateLeagueMutation>
        )}
      </AddLeagueIdMutation>
    );
  }
}

export default CreateLeagueScreen;
