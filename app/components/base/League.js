import React, { PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import LeagueTabs from "../base/LeagueTabs";
import * as Colors from "../../constants/Colors";

class League extends PureComponent {
  render() {
    const actionNames = {
      addPlayer: "addPlayer",
      createGame: "createGame"
    };

    const actions = [
      {
        text: "Add player",
        name: actionNames.addPlayer,
        color: Colors.Secondary,
        icon: require("../../assets/icons/person_add_white.png"),
        buttonSize: 50,
        size: 50
      },
      {
        text: "Create Game",
        name: actionNames.createGame,
        color: Colors.Secondary,
        icon: require("../../assets/icons/playlist_add_white.png"),
        buttonSize: 50,
        size: 50
      }
    ];

    const onPressAction = name => {
      switch (name) {
        case actionNames.addPlayer:
          return this.props.openAddPlayer();
        case actionNames.createGame:
          return this.props.openCreateGame();
        default:
          return null;
      }
    };

    return (
      <View style={styles.container}>
        <LeagueTabs
          refetch={this.props.refetch}
          refreshing={this.props.refreshing}
          league={this.props.league}
          selectedTab={this.props.selectedTab}
          selectTab={this.props.selectTab}
          openPlayer={this.props.openPlayer}
        />
        <FloatingAction
          position={Platform.OS === "ios" ? "center" : "right"}
          actions={actions}
          color={Colors.Primary}
          onPressItem={onPressAction}
        />
      </View>
    );
  }
}

export default League;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    borderBottomWidth: 0,
    backgroundColor: Colors.Primary
  },
  activityIndicator: {
    top: 40
  },
  headerRight: {
    paddingRight: 16
  },
  actionButton: {
    marginTop: 2
  }
});
