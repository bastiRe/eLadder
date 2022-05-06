import React from "react";
import Game from "../base/Game";

function GameScreen({ route, navigation }) {
  const { game, leagueId } = route.params;
  return <Game game={game} leagueId={leagueId} navigation={navigation} />;
}

export default GameScreen;
