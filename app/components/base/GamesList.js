import React, { PureComponent } from "react";
import { StyleSheet, SectionList, View, Text } from "react-native";
import moment from "moment";
import GameRow from "./GameRow";
import EmptyList from "./EmptyList";
import * as colors from "../../constants/Colors";

class GamesList extends PureComponent {
  separatedGames() {
    // Games are coming in as ascending by date
    return this.props.games.reduceRight((memo, game) => {
      const dateString = moment(game.date).format("MMMM D, YYYY");
      if (memo.length > 0 && memo[memo.length - 1].title === dateString) {
        memo[memo.length - 1].data.push(game);
      } else {
        memo.push({
          title: dateString,
          data: [game]
        });
      }
      return memo;
    }, []);
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          style={styles.container}
          sections={this.separatedGames()}
          onRefresh={this.props.refetch}
          refreshing={this.props.refreshing}
          ListEmptyComponent={() => (
            <EmptyList
              title="No games"
              text={`Tap the + icon below to add a new player or game.`}
            />
          )}
          renderItem={data => (
            <GameRow
              {...data.item}
              leagueId={this.props.leagueId}
              key={data.index}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
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
    backgroundColor: colors.Background
  },
  sectionHeader: {
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 5,
    color: colors.LightText,
    backgroundColor: colors.Background
  }
});

export default GamesList;
