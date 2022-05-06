import React from "react";
import { SectionList } from "react-native";
import moment from "moment";
import * as Amplitude from "expo-analytics-amplitude";

import GameRow from "./GameRow";
import EmptyList from "./EmptyList";
import { Background, SectionHeaderText } from "../elements";

function GamesList({ games, leagueId, navigation, refetch, refreshing }) {
  // Games are coming in as ascending by date
  const separatedGames = games.reduceRight((memo, game) => {
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

  const openGame = game => {
    Amplitude.logEventWithPropertiesAsync("OpenGame", {
      leagueId: leagueId,
      gameId: game.id
    });
    navigation.navigate("game", {
      game,
      leagueId: leagueId
    });
  };

  return (
    <Background>
      <SectionList
        sections={separatedGames}
        onRefresh={refetch}
        refreshing={refreshing}
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
            leagueId={leagueId}
            key={data.index}
            onPress={() => openGame(data.item)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeaderText>{title}</SectionHeaderText>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </Background>
  );
}

export default GamesList;
