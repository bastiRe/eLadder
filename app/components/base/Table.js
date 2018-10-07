import React, { PureComponent } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import PlayerRow from "../base/PlayerRow";
import * as Colors from "../../constants/Colors";
import EmptyList from "../base/EmptyList";

class Table extends PureComponent {
  _sortedPlayers() {
    const players = this.props.players.filter(p => !p.toDelete);
    return players.sort((playerA, playerB) => playerB.points - playerA.points);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={this._sortedPlayers()}
          onRefresh={this.props.refetch}
          refreshing={this.props.refreshing}
          ListEmptyComponent={() => (
            <EmptyList
              title="No players"
              text={`Tap the + icon below to add a new player or game.`}
            />
          )}
          ListHeaderComponent={() => {
            if (this.props.players.length === 0) return null;
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
              leagueId={this.props.leagueId}
              openPlayer={this.props.openPlayer}
            />
          )}
          keyExtractor={(data, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  },
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

export default Table;
