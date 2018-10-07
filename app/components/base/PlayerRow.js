import { StyleSheet, Text, TouchableHighlight } from "react-native";
import React from "react";
import * as colors from "../../constants/Colors";
import { Row } from "../elements";
import DeletePlayerMutation from "../graphql/DeletePlayerMutation";

const PlayerRow = ({ openPlayer, player, rank, leagueId }) => {
  return (
    <DeletePlayerMutation player={player} leagueId={leagueId}>
      {({ deletePlayerHandler }) => (
        <TouchableHighlight
          onPress={() => openPlayer(player)}
          onLongPress={deletePlayerHandler}
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
      )}
    </DeletePlayerMutation>
  );
};

export default PlayerRow;

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
