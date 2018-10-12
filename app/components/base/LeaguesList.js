import React, { PureComponent } from "react";
import { FlatList, Platform } from "react-native";
import ActionButton from "react-native-action-button";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import LeagueItem from "../base/LeagueItem";
import * as Colors from "../../constants/Colors";
import EmptyList from "../base/EmptyList";
import { Background } from "../elements";

class LeaguesList extends PureComponent {
  render() {
    return (
      <Background>
        <FlatList
          contentInset={{ bottom: 80 }}
          data={this.props.leagues}
          onRefresh={this.props.refetch}
          refreshing={this.props.refreshing}
          ListEmptyComponent={() => (
            <EmptyList
              title="Welcome to eLadder"
              text={`As soon as you add a new league or get invited, it will appear here. \n\n Tap the + icon below to add your first league.`}
            />
          )}
          renderItem={data => (
            <LeagueItem
              league={data.item}
              key={data.index}
              openLeague={this.props.openLeague}
            />
          )}
          keyExtractor={(data, index) => index.toString()}
        />
        <ActionButton
          position={Platform.OS === "ios" ? "center" : "right"}
          buttonColor={Colors.Primary}
        >
          <ActionButton.Item
            buttonColor={Colors.Secondary}
            onPress={this.props.openLeagueScanner}
            title="Add with QR-Code"
          >
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={Colors.TextOnPrimary}
              style={{ marginTop: 2 }}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.Secondary}
            onPress={this.props.openCreateLeague}
            title="Create new league"
          >
            <MaterialIcons
              name="playlist-add"
              size={24}
              color={Colors.TextOnPrimary}
              style={{ marginTop: 2 }}
            />
          </ActionButton.Item>
        </ActionButton>
      </Background>
    );
  }
}

export default LeaguesList;
