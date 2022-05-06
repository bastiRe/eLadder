import React from "react";
import * as Amplitude from "expo-analytics-amplitude";

import HeaderDropdown from "../base/HeaderDropdown";
import RemoveLeagueMutation from "../graphql/RemoveLeagueMutation";

function LeagueOptions({ navigation, route }) {
  const { leagueId, leagueTitle } = route.params;

  const shareLeague = () => {
    Amplitude.logEventWithPropertiesAsync("OpenShareLeague", {
      leagueId
    });
    navigation.navigate("shareLeague", {
      leagueId,
      leagueTitle
    });
  };

  return (
    <RemoveLeagueMutation leagueId={leagueId}>
      {({ removeLeagueHandler }) => (
        <HeaderDropdown
          options={[
            {
              label: "Share League",
              onSelect: shareLeague
            },
            {
              label: "Delete League",
              onSelect: async () => {
                const removed = await removeLeagueHandler();
                if (removed) {
                  navigation.goBack();
                }
              }
            }
          ]}
        />
      )}
    </RemoveLeagueMutation>
  );
}

export default LeagueOptions;
