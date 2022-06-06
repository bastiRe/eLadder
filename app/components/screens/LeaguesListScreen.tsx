import React, { Fragment } from "react";
import { ActivityIndicator } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";
import { useLeagueIds } from "../../context/LeagueIds";
import LeaguesList from "../base/LeaguesList";
import LeaguesQuery from "../graphql/LeaguesQuery";
import AddLeagueFromLink from "../base/AddLeagueFromLink.js";

function LeaguesListScreen({ navigation }) {
  const openLeague = (leagueId, allLeagues) => {
    if (navigation.isFocused()) {
      const league = allLeagues.find(league => league.id === leagueId);
      Amplitude.logEventWithPropertiesAsync("OpenLeague", { leagueId });
      navigation.navigate("league", {
        leagueId,
        leagueTitle: league.title
      });
    }
  };
  const openLeagueScanner = () => {
    navigation.navigate("leagueScanner");
  };

  const openCreateLeague = () => {
    navigation.navigate("createLeague");
  };

  const openLeaguesList = () => {
    navigation.navigate("leaguesList");
  };

  const { leagueIds } = useLeagueIds();

  return (
    <LeaguesQuery leagueIds={leagueIds}>
      {({ data, refetch, networkStatus }) => {
        let content;
        if (!data || data.loading) {
          content = <ActivityIndicator style={{ marginTop: 40 }} />;
        } else {
          content = (
            <Fragment>
              <AddLeagueFromLink
                leagueIds={leagueIds}
                openLeague={id => openLeague(id, data.leagues)}
                openLeaguesList={() => openLeaguesList()}
              />
              <LeaguesList
                leagues={data.leagues}
                openLeague={id => openLeague(id, data.leagues)}
                openLeagueScanner={openLeagueScanner}
                openCreateLeague={openCreateLeague}
                refreshing={networkStatus === 4}
                refetch={refetch}
              />
            </Fragment>
          );
        }

        return content;
      }}
    </LeaguesQuery>
  );
}

export default LeaguesListScreen;
