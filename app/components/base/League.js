import React, { PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import LeagueTabs from "../base/LeagueTabs";
import * as Colors from "../../constants/Colors";

class League extends PureComponent {
  render() {
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
        <ActionButton
          position={Platform.OS === "ios" ? "center" : "right"}
          buttonColor={Colors.Primary}
        >
          <ActionButton.Item
            buttonColor={Colors.Secondary}
            onPress={() => this.props.openAddPlayer()}
            title="Add Player"
          >
            <MaterialIcons
              name="person-add"
              size={24}
              color={Colors.TextOnPrimary}
              style={styles.actionButton}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.Secondary}
            onPress={() => this.props.openCreateGame()}
            title="Create Game"
          >
            <MaterialIcons
              name="playlist-add"
              size={24}
              color={Colors.TextOnPrimary}
              style={styles.actionButton}
            />
          </ActionButton.Item>
        </ActionButton>
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
