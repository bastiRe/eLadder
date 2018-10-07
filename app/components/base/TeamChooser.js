import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import ModalSelector from 'react-native-modal-selector';

class TeamChooser extends React.PureComponent {
  _onSubmit() {
    this.props.onSubmit(this.state);
  }

  _availablePlayersData(index) {
    return this.props.players
      .filter(p => {
        const notOtherTeam = this.props.otherTeam.indexOf(p) === -1;
        const sameTeamIndex = this.props.team.indexOf(p);
        const notSameTeam = sameTeamIndex === -1 || sameTeamIndex === index;
        return notOtherTeam && notSameTeam;
      })
      .map(p => {
        return { key: p.id, label: p.name };
      });
  }

  _updateTeam(playerId, index) {
    const newTeam = this.props.team.slice();
    if (playerId) {
      const player = this.props.players.find(p => p.id === playerId);
      newTeam[index] = player;
    } else {
      newTeam.splice(index, 1);
    }
    this.props.onChange(newTeam);
  }

  _renderButton(index) {
    const player = this.props.team[index];
    const playersData = this._availablePlayersData(index);
    let playerView;
    if (player) {
      playerView = <Text style={styles.playerText}>{player.name}</Text>;
      playersData.push({ label: 'Remove Player', key: null });
    } else {
      playerView = (
        <View style={styles.playerButton}>
          <Text style={styles.playerButtonText}>Add Player</Text>
        </View>
      );
    }

    return (
      <ModalSelector
        key={index}
        data={playersData}
        animationType="fade"
        onChange={({ key }) => this._updateTeam(key, index)}
        optionTextStyle={styles.playerOption}
      >
        {playerView}
      </ModalSelector>
    );
  }

  _renderPlayers() {
    const playerButton = this.props.team.map((_, i) => this._renderButton(i));
    if (this.props.team.length < 2) {
      playerButton.push(this._renderButton(this.props.team.length));
    }
    return playerButton;
  }

  render() {
    return <View style={styles.container}>{this._renderPlayers()}</View>;
  }
}

export default TeamChooser;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerText: {
    fontSize: 16,
    height: 24,
    textAlign: 'center',
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
    textAlign: 'center',
    color: Colors.Primary
  }
});
