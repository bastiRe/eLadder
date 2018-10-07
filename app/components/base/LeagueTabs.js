import React, { PureComponent } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabViewAnimated, TabBar } from "react-native-tab-view";
import GamesList from "./GamesList";
import Table from "./Table";
import * as Colors from "../../constants/Colors";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export default class LeagueTabs extends PureComponent {
  _handleIndexChange = index => {
    const selectedTab = index === 0 ? "Table" : "Games";
    this.props.selectTab(selectedTab);
  };

  _renderHeader = props => (
    <TabBar
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      {...props}
    />
  );

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "games":
        return (
          <GamesList
            games={this.props.league.games}
            leagueId={this.props.league.id}
            refetch={this.props.refetch}
            refreshing={this.props.refreshing}
          />
        );
      case "table":
        return (
          <Table
            players={this.props.league.players}
            openPlayer={this.props.openPlayer}
            leagueId={this.props.league.id}
            refetch={this.props.refetch}
            refreshing={this.props.refreshing}
          />
        );
    }
  };

  render() {
    const tabState = {
      routes: [
        { key: "table", title: "Table" },
        { key: "games", title: "Games" }
      ],
      index: this.props.selectedTab === "Table" ? 0 : 1
    };
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={tabState}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor: Colors.Primary
  },
  indicator: {
    backgroundColor: Colors.Secondary
  }
});
