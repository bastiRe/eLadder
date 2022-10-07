import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";

import { useLeagueQuery } from "../../graphql/generated.ts";
import graphqlClient from "../../graphql/graphqlClient";
import League from "../base/League";
import computeStandings from "../../helpers/computeStandings";

const styles = StyleSheet.create({
  activityIndicator: {
    top: 40
  }
});

function LeagueScreen({ navigation, route }) {
  const openCreateGame = league => {
    Amplitude.logEventWithPropertiesAsync("OpenCreateGame", {
      leagueId: league.id
    });
    navigation.navigate("createGame", {
      players: league.players,
      leagueId: league.id
    });
  };

  const openAddPlayer = league => {
    Amplitude.logEventWithPropertiesAsync("OpenCreatePlayer", {
      leagueId: league.id
    });
    navigation.navigate("addPlayer", {
      players: league.players,
      leagueId: league.id
    });
  };

  const leagueId = route.params.leagueId;
  const { data, isLoading, refetch } = useLeagueQuery(graphqlClient, {
    leagueId
  });

  if (isLoading || !data?.leagues_by_pk)
    return <ActivityIndicator style={styles.activityIndicator} />;

  const league = computeStandings(data.leagues_by_pk);

  return (
    <League
      league={league}
      refetch={refetch}
      refreshing={isLoading}
      navigation={navigation}
      openAddPlayer={() => openAddPlayer(data.leagues_by_pk)}
      openCreateGame={() => openCreateGame(data.leagues_by_pk)}
    />
  );
}

export default LeagueScreen;
