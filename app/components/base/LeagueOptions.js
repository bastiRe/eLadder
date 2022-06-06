import React from "react";
import * as Amplitude from "expo-analytics-amplitude";

import HeaderDropdown from "../base/HeaderDropdown";
import { useLeagueIds } from "../../context/LeagueIds";

function LeagueOptions({ navigation, route }) {
  const { leagueId, leagueTitle } = route.params;

  const { removeLeagueId } = useLeagueIds();

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
    <HeaderDropdown
      options={[
        {
          label: "Share League",
          onSelect: shareLeague
        },
        {
          label: "Delete League",
          onSelect: async () => {
            const removed = await removeLeagueId(leagueId);
            console.log(removed);
            if (removed) {
              navigation.goBack();
            }
          }
        }
      ]}
    />
  );
}

export default LeagueOptions;
