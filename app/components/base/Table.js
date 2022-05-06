import React, { PureComponent } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";
import PlayerRow from "../base/PlayerRow";
import * as Colors from "../../constants/Colors";
import EmptyList from "../base/EmptyList";
import { Background } from "../elements";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5
  },
  rank: {
    color: Colors.LightText,
    flex: 2,
    fontWeight: "bold",
    textAlign: "left"
  },
  wld: {
    color: Colors.LightText,
    fontWeight: "bold",
    width: 60,
    textAlign: "center"
  },
  points: {
    color: Colors.LightText,
    fontWeight: "bold",
    width: 60,
    textAlign: "right"
  }
});

function Table({ players, navigation, leagueId, refetch, refreshing }) {
  const activePlayers = players.filter(p => !p.toDelete);
  const sortedPlayers = activePlayers.sort(
    (playerA, playerB) => playerB.points - playerA.points
  );

  const openPlayer = player => {
    Amplitude.logEventWithPropertiesAsync("OpenPlayer", {
      leagueId,
      playerId: player.id
    });
    navigation.navigate("player", {
      player,
      leagueId
    });
  };

  return (
    <Background>
      <FlatList
        contentInset={{ bottom: 80 }}
        data={sortedPlayers}
        onRefresh={refetch}
        refreshing={refreshing}
        ListEmptyComponent={() => (
          <EmptyList
            title="No players"
            text={`Tap the + icon below to add a new player or game.`}
          />
        )}
        ListHeaderComponent={() => {
          if (players.length === 0) return null;
          return (
            <View style={styles.headerContainer}>
              <Text style={styles.rank}># </Text>
              <Text style={styles.wld}>W/D/L</Text>
              <Text style={styles.points}>Points</Text>
            </View>
          );
        }}
        renderItem={data => (
          <PlayerRow
            player={data.item}
            rank={data.index + 1}
            key={data.index}
            leagueId={leagueId}
            openPlayer={openPlayer}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </Background>
  );
}

export default Table;
