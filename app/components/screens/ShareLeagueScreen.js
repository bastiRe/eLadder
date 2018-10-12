import React from "react";
import { StyleSheet } from "react-native";

import ShareLeague from "../base/ShareLeague";
import { ModalBackground } from "../elements";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    elevation: 0
  }
});

class AddPlayerScreen extends React.Component {
  static navigationOptions = {
    title: "Share League",
    headerStyle: styles.header
  };

  render() {
    const { leagueId, leagueTitle } = this.props.navigation.state.params;
    return (
      <ModalBackground>
        <ShareLeague leagueId={leagueId} leagueTitle={leagueTitle} />
      </ModalBackground>
    );
  }
}

export default AddPlayerScreen;
