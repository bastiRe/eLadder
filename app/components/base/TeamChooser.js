import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
import ModalSelector from "react-native-modal-selector";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    height: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  playerText: {
    fontSize: 16,
    height: 24,
    textAlign: "center",
    color: Colors.Primary
  },
  playerOption: {
    color: Colors.Primary
  },
  playerButton: {
    marginTop: 10,
    backgroundColor: Colors.Background,
    height: 32,
    width: 100,
    borderRadius: 8
  },
  playerButtonText: {
    lineHeight: 32,
    fontSize: 16,
    textAlign: "center",
    color: Colors.Primary
  }
});

function TeamChooser({ players, otherTeam, team, onChange }) {
  const computeAvailablePlayers = index => {
    return players.filter(p => {
      const onOtherTeam = otherTeam.includes(p);
      const onSameTeam = team.includes(p);
      const currentPlayer = index === team.indexOf(p);
      return !onOtherTeam && (!onSameTeam || currentPlayer);
    });
  };

  const updateTeam = (player, buttonIndex) => {
    const newTeam = team.slice();
    if (player.id) {
      newTeam[buttonIndex] = player;
    } else {
      newTeam.splice(buttonIndex, 1);
    }
    onChange(newTeam);
  };

  const renderButton = buttonIndex => {
    const player = team[buttonIndex];
    const playersData = computeAvailablePlayers(buttonIndex);
    let playerView;
    if (player) {
      playerView = <Text style={styles.playerText}>{player.name}</Text>;
      playersData.push({ name: "Remove Player", id: null });
    } else {
      playerView = (
        <View style={styles.playerButton}>
          <Text style={styles.playerButtonText}>Add Player</Text>
        </View>
      );
    }

    return (
      <ModalSelector
        key={buttonIndex}
        data={playersData}
        keyExtractor={({ id }) => id || "remove"}
        labelExtractor={({ name }) => name}
        animationType="fade"
        onChange={player => updateTeam(player, buttonIndex)}
        optionTextStyle={styles.playerOption}
      >
        {playerView}
      </ModalSelector>
    );
  };

  const renderPlayers = () => {
    const playerButtons = team.map((_, i) => renderButton(i));
    if (team.length < 2) {
      playerButtons.push(renderButton(team.length));
    }
    return playerButtons;
  };

  return <View style={styles.container}>{renderPlayers()}</View>;
}

export default TeamChooser;
