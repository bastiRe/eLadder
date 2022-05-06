import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";
import { Query } from "react-apollo";

import League from "../base/League";
import LEAGUE from "../../graphql/League";
import computeStandings from "../../helpers/computeStandings";
import LeagueOptions from "../base/LeagueOptions";

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
  return (
    <Query
      query={LEAGUE}
      variables={{ leagueId }}
      fetchPolicy="cache-and-network"
    >
      {({ loading, data, refetch }) => {
        if (loading && !data.League)
          return <ActivityIndicator style={styles.activityIndicator} />;
        const league = computeStandings(data.league);

        return (
          <League
            league={league}
            refetch={refetch}
            refreshing={loading}
            navigation={navigation}
            openAddPlayer={() => openAddPlayer(data.league)}
            openCreateGame={() => openCreateGame(data.league)}
          />
        );
      }}
    </Query>
  );
}

export default LeagueScreen;
