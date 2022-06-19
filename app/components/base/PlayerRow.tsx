import { StyleSheet, Text, TouchableHighlight } from "react-native";
import React from "react";

import * as colors from "../../constants/Colors";
import { useDeletePlayer } from "../../hooks/deletePlayer";
import { Row } from "../elements";

const styles = StyleSheet.create({
  name: {
    flex: 2,
    textAlign: "left"
  },
  wld: {
    color: colors.LightText,
    width: 60,
    textAlign: "center"
  },
  points: {
    width: 60,
    textAlign: "right"
  }
});

const PlayerRow = ({ openPlayer, player, rank, leagueId }) => {
  const { deletePlayer } = useDeletePlayer(leagueId);
  return (
    <TouchableHighlight
      onPress={() => openPlayer(player)}
      onLongPress={() => deletePlayer({ id: player.id })}
    >
      <Row>
        <Text>{rank}. </Text>
        <Text style={styles.name}> {player.name}</Text>
        <Text style={styles.wld}>
          {player.wins}/{player.draws}/{player.losses}
        </Text>
        <Text style={styles.points}>{Math.round(player.points)}</Text>
      </Row>
    </TouchableHighlight>
  );
};

export default PlayerRow;
