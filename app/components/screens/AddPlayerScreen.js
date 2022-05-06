import React from "react";
import { Alert, StyleSheet, View, ActivityIndicator } from "react-native";
import { Mutation } from "react-apollo";
import * as Amplitude from "expo-analytics-amplitude";
import LEAGUE from "../../graphql/League";
import CREATE_PLAYER from "../../graphql/CreatePlayer";
import AddPlayerForm from "../base/AddPlayerForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  }
});

function AddPlayerScreen({ route, navigation }) {
  const leagueId = route.params.leagueId;
  return (
    <Mutation
      mutation={CREATE_PLAYER}
      refetchQueries={[{ query: LEAGUE, variables: { leagueId } }]}
      onCompleted={() => {
        navigation.goBack();
        Amplitude.logEventWithPropertiesAsync("CreatePlayer", { leagueId });
      }}
    >
      {(addPlayer, { error, data, loading }) => {
        let content;
        if (error) {
          Alert.alert(error.message.replace("GraphQL error: ", ""));
        }
        if (loading) {
          content = <ActivityIndicator />;
        } else {
          content = (
            <AddPlayerForm
              onSubmit={async ({ name }) => {
                await addPlayer({ variables: { name, leagueId } });
              }}
            />
          );
        }
        return <View style={styles.container}>{content}</View>;
      }}
    </Mutation>
  );
}

export default AddPlayerScreen;
