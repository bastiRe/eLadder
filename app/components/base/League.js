import React from "react";
import { StyleSheet, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import LeagueTabs from "../base/LeagueTabs";
import * as Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicator: {
    top: 40
  },
  actionButton: {
    marginTop: 2
  }
});

function League({
  navigation,
  refetch,
  refreshing,
  openAddPlayer,
  openCreateGame,
  league
}) {
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
        return openAddPlayer();
      case actionNames.createGame:
        return openCreateGame();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <LeagueTabs
        refetch={refetch}
        refreshing={refreshing}
        league={league}
        navigation={navigation}
      />
      <FloatingAction
        actions={actions}
        color={Colors.Primary}
        onPressItem={onPressAction}
      />
    </View>
  );
}

export default League;
