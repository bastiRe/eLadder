import React, { PureComponent } from "react";
import { FlatList, Platform } from "react-native";
import LeagueItem from "../base/LeagueItem";
import * as Colors from "../../constants/Colors";
import ActionButton from "react-native-action-button";
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
          onPress={this.props.openCreateLeague}
          buttonColor={Colors.Primary}
          position={Platform.OS === "ios" ? "center" : "right"}
        />
      </Background>
    );
  }
}

export default LeaguesList;
