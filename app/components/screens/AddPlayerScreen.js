import React from "react";
import { Alert, StyleSheet, View, ActivityIndicator } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";
import graphqlClient from "../../graphql/graphqlClient";
import {
  useLeagueQuery,
  useCreatePlayerMutation
} from "../../graphql/generated.ts";
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
  const { refetch } = useLeagueQuery(graphqlClient, { leagueId });
  const { mutate, isLoading } = useCreatePlayerMutation(graphqlClient, {
    onSuccess: () => {
      refetch();
      Amplitude.logEventWithPropertiesAsync("CreatePlayer", { leagueId });
      navigation.goBack();
    },
    onError: error => {
      Alert.alert(error.message.replace("GraphQL error: ", ""));
    }
  });
  let content;
  if (isLoading) {
    content = <ActivityIndicator />;
  } else {
    content = (
      <AddPlayerForm
        onSubmit={({ name }) => {
          mutate({ name, leagueId });
        }}
      />
    );
  }
  return <View style={styles.container}>{content}</View>;
}

export default AddPlayerScreen;
