import React, { Fragment } from "react";
import { ActivityIndicator } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";
import { useLeagueIds } from "../../context/LeagueIds";
import graphqlClient from "../../graphql/graphqlClient";
import { useLeaguesQuery } from "../../graphql/generated";

import LeaguesList from "../base/LeaguesList";
import AddLeagueFromLink from "../base/AddLeagueFromLink.js";

function LeaguesListScreen({ navigation }) {
  const openLeague = (leagueId: string, allLeagues: any[]) => {
    if (navigation.isFocused()) {
      const league = allLeagues.find(league => league.id === leagueId);
      Amplitude.logEventWithPropertiesAsync("OpenLeague", { leagueId });
      navigation.navigate("league", {
        leagueId,
        leagueTitle: league.title
      });
    }
  };

  const { leagueIds } = useLeagueIds();
  const {
    data,
    isLoading,
    refetch,
    isRefetching
  } = useLeaguesQuery(graphqlClient, { leagueIds });
  if (!data || isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  return (
    <>
      <AddLeagueFromLink
        leagueIds={leagueIds}
        openLeague={(id: string) => openLeague(id, data.leagues)}
        openLeaguesList={() => navigation.navigate("leaguesList")}
      />
      <LeaguesList
        leagues={data.leagues}
        openLeague={(id: string) => openLeague(id, data.leagues)}
        openLeagueScanner={() => navigation.navigate("leagueScanner")}
        openCreateLeague={() => navigation.navigate("createLeague")}
        refreshing={isRefetching}
        refetch={refetch}
      />
    </>
  );
}

export default LeaguesListScreen;
