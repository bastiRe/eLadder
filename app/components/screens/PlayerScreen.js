import React from "react";
import { StyleSheet } from "react-native";
import Player from "../base/Player";
import * as Colors from "../../constants/Colors";

class PlayerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.player.name,
      headerStyle: styles.header
    };
  };

  render() {
    const { player, leagueId } = this.props.navigation.state.params;
    return <Player player={player} leagueId={leagueId} />;
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
