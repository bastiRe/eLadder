import React from "react";
import Player from "../base/Player";

function PlayerScreen({ route }) {
  const { player, leagueId } = route.params;
  return <Player player={player} leagueId={leagueId} />;
}

export default PlayerScreen;
