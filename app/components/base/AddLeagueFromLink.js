import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useLeagueIds } from "../../context/LeagueIds";
import * as Linking from "expo-linking";
import * as Amplitude from "expo-analytics-amplitude";

function AddLeagueFromLink({ leagueIds, openLeague, openLeaguesList }) {
  useEffect(() => {
    Linking.getInitialURL().then(url => handleUrl(url));
    Linking.addEventListener("url", ({ url }) => handleUrl(url));
  });

  const { addLeagueId } = useLeagueIds();

  const handleUrl = url => {
    let { path, queryParams } = Linking.parse(url);

    if (path !== "add_league") return;

    const { leagueId, leagueTitle } = queryParams;
    if (leagueIds.indexOf(leagueId) !== -1) {
      openLeague(leagueId);
    } else if (leagueId && leagueTitle) {
      Alert.alert(
        "Add league",
        `Do you want to add the league ${leagueTitle}?`,
        [
          {
            text: "Yes",
            onPress: async () => {
              Amplitude.logEventWithPropertiesAsync("AddLeagueFromLink", {
                leagueId
              });
              addLeagueId(leagueId);
              openLeaguesList();
            }
          },
          { text: "Cancel", style: "cancel" }
        ]
      );
    }
  };

  return null;
}

export default AddLeagueFromLink;
