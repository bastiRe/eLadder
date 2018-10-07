import React from "react";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";
import ScoreInput from "./ScoreInput";
import Button from "./Button";
import TeamChooser from "./TeamChooser";
import GameTimeChooser from "./GameTimeChooser";

class CreateGameForm extends React.PureComponent {
  state = {
    score0: 0,
    score1: 0,
    team0: [],
    team1: [],
    date: moment()
  };

  _onSubmit() {
    const teamIds = [
      { score: this.state.score0, playerIds: this.state.team0.map(p => p.id) },
      { score: this.state.score1, playerIds: this.state.team1.map(p => p.id) }
    ];
    this.props.onSubmit({ teamIds, date: this.state.date });
  }

  render() {
    return (
      <View style={styles.container}>
        <GameTimeChooser
          date={this.state.date}
          onChange={date => this.setState({ date: moment(date) })}
        />
        <View style={styles.scoreContainer}>
          <ScoreInput
            score={this.state.score0}
            onChange={score => this.setState({ score0: score })}
          />
          <Text style={styles.dividerText}>:</Text>
          <ScoreInput
            score={this.state.score1}
            onChange={score => this.setState({ score1: score })}
          />
        </View>
        <View style={styles.scoreContainer}>
          <TeamChooser
            players={this.props.players}
            team={this.state.team0}
            otherTeam={this.state.team1}
            onChange={team => this.setState({ team0: team })}
          />
          <Text style={styles.dividerText}> </Text>
          <TeamChooser
            players={this.props.players}
            team={this.state.team1}
            otherTeam={this.state.team0}
            onChange={team => this.setState({ team1: team })}
          />
        </View>
        <Button
          title="Submit"
          type="primary"
          onPress={() => this._onSubmit()}
          style={styles.button}
          disabled={
            this.state.team0.length === 0 ||
            this.state.team1.length === 0 ||
            this.state.team1.length !== this.state.team0.length
          }
        />
      </View>
    );
  }
}

export default CreateGameForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  scoreContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  dividerText: {
    fontSize: 36
  },
  button: {
    marginTop: 24
  }
});
