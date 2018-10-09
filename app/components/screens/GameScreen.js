import React from "react";
import { StyleSheet } from "react-native";
import Game from "../base/Game";
import * as Colors from "../../constants/Colors";

class PlayerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Game Overview",
      headerStyle: styles.header
    };
  };

  render() {
    const { game, leagueId } = this.props.navigation.state.params;
    return <Game game={game} leagueId={leagueId} />;
  }
}

export default PlayerScreen;

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    elevation: 0,
    backgroundColor: Colors.Primary
  }
});
