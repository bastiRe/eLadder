import React from "react";
import { useWindowDimensions } from "react-native";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import GamesList from "./GamesList";
import Table from "./Table";
import * as Colors from "../../constants/Colors";

function LeagueTabs({ league, refetch, refreshing, navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "gamesList", title: "Games" },
    { key: "table", title: "Table" }
  ]);

  const renderGamesList = () => {
    return (
      <GamesList
        games={league.games}
        leagueId={league.id}
        refetch={refetch}
        refreshing={refreshing}
        navigation={navigation}
      />
    );
  };

  const renderTable = () => {
    return (
      <Table
        players={league.players}
        leagueId={league.id}
        refetch={refetch}
        refreshing={refreshing}
        navigation={navigation}
      />
    );
  };

  const renderScene = SceneMap({
    gamesList: renderGamesList,
    table: renderTable
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.Primary }}
      style={{ backgroundColor: Colors.TextOnPrimary }}
      labelStyle={{ color: Colors.Primary }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default LeagueTabs;
