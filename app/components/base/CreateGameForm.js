import React, { useReducer } from "react";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";
import ScoreInput from "./ScoreInput";
import Button from "./Button";
import TeamChooser from "./TeamChooser";
import GameTimeChooser from "./GameTimeChooser";

function reducer(state, action) {
  switch (action.type) {
    case "changeScoreTeam0":
      return { ...state, score0: action.score };
    case "changeScoreTeam1":
      return { ...state, score1: action.score };
    case "changeTeam0":
      return { ...state, team0: action.team };
    case "changeTeam1":
      return { ...state, team1: action.team };
    case "changeDate":
      return { ...state, date: action.date };
    default:
      throw new Error();
  }
}

const initialState = {
  score0: 0,
  score1: 0,
  team0: [],
  team1: [],
  date: moment()
};

function CreateGameForm({ players, onSubmit }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitForm = () => {
    const teamIds = [
      ...state.team0.map(p => ({ team_id: 0, player_id: p.id })),
      ...state.team1.map(p => ({ team_id: 1, player_id: p.id })),
    ];
    onSubmit({ teamIds, date: state.date, scores: [state.score0, state.score1] });
  };

  return (
    <View style={styles.container}>
      <GameTimeChooser
        date={state.date}
        onChange={date => dispatch({ type: "changeDate", date: moment(date) })}
      />
      <View style={styles.scoreContainer}>
        <ScoreInput
          score={state.score0}
          onChange={score =>
            dispatch({ type: "changeScoreTeam0", score: score })
          }
        />
        <Text style={styles.dividerText}>:</Text>
        <ScoreInput
          score={state.score1}
          onChange={score =>
            dispatch({ type: "changeScoreTeam1", score: score })
          }
        />
      </View>
      <View style={styles.scoreContainer}>
        <TeamChooser
          players={players}
          team={state.team0}
          otherTeam={state.team1}
          onChange={team => dispatch({ type: "changeTeam0", team })}
        />
        <Text style={styles.dividerText}> </Text>
        <TeamChooser
          players={players}
          team={state.team1}
          otherTeam={state.team0}
          onChange={team => dispatch({ type: "changeTeam1", team })}
        />
      </View>
      <Button
        title="Submit"
        type="primary"
        onPress={submitForm}
        style={styles.button}
        disabled={
          state.team0.length === 0 ||
          state.team1.length === 0 ||
          state.team1.length !== state.team0.length
        }
      />
    </View>
  );
}

export default CreateGameForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10
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
