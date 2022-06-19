import React from "react";
import Player from "../base/Player";

function PlayerScreen({ route, navigation }) {
  const { player, leagueId } = route.params;
  return <Player player={player} leagueId={leagueId} navigation={navigation} />;
}

export default PlayerScreen;
