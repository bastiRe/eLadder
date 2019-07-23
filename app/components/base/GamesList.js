import React, { PureComponent } from "react";
import { SectionList } from "react-native";
import moment from "moment";
import { withNavigation } from "react-navigation";
import * as Amplitude from 'expo-analytics-amplitude';

import GameRow from "./GameRow";
import EmptyList from "./EmptyList";
import { Background, SectionHeaderText } from "../elements";

class GamesList extends PureComponent {
  separatedGames() {
    // Games are coming in as ascending by date
    return this.props.games.reduceRight((memo, game) => {
      const dateString = moment(game.date).format("MMMM Do YYYY");
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

  _openGame(game) {
    Amplitude.logEventWithProperties("OpenGame", {
      leagueId: this.props.leagueId,
      gameId: game.id
    });
    this.props.navigation.navigate("Game", {
      game,
      leagueId: this.props.leagueId
    });
  }

  render() {
    return (
      <Background>
        <SectionList
          sections={this.separatedGames()}
          onRefresh={this.props.refetch}
          refreshing={this.props.refreshing}
          contentInset={{ bottom: 80 }}
          ListEmptyComponent={() => (
            <EmptyList
              title="No games"
              text={`Tap the + icon below to add a new player or game.`}
            />
          )}
          renderItem={data => (
            <GameRow
              game={data.item}
              leagueId={this.props.leagueId}
              key={data.index}
              onPress={() => this._openGame(data.item)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionHeaderText>{title}</SectionHeaderText>
          )}
          keyExtractor={(data, index) => index.toString()}
        />
      </Background>
    );
  }
}

export default withNavigation(GamesList);
