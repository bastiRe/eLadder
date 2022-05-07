import React, { useEffect } from "react";
import { Alert } from "react-native";
import { compose, graphql } from "react-apollo";
import * as Linking from "expo-linking";
import * as Amplitude from "expo-analytics-amplitude";
import ADD_LEAGUE_ID from "../../graphql/AddLeagueId";

function AddLeagueFromLink({
  leagueIds,
  openLeague,
  addLeagueIdMutation,
  openLeaguesList
}) {
  useEffect(() => {
    Linking.getInitialURL().then(url => handleUrl(url));
    Linking.addEventListener("url", ({ url }) => handleUrl(url));
  });

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
              await addLeagueIdMutation({ variables: { leagueId } });
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

export default compose(graphql(ADD_LEAGUE_ID, { name: "addLeagueIdMutation" }))(
  AddLeagueFromLink
);
