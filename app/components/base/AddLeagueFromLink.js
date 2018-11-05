import React from "react";
import { Alert, Linking } from "react-native";
import { compose, graphql } from "react-apollo";
import * as Expo from "expo";
import ADD_LEAGUE_ID from "../../graphql/AddLeagueId";

class AddLeagueFromLink extends React.Component {
  componentDidMount() {
    Linking.getInitialURL().then(url => this._handleUrl(url));
    Linking.addEventListener("url", ({ url }) => this._handleUrl(url));
  }

  _handleUrl = url => {
    let { path, queryParams } = Expo.Linking.parse(url);

    if (path !== "add_league") return;

    const { leagueId, leagueTitle } = queryParams;
    if (this.props.leagueIds.indexOf(leagueId) !== -1) {
      this.props.openLeague(leagueId);
    } else if (leagueId && leagueTitle) {
      Alert.alert(
        "Add league",
        `Do you want to add the league ${leagueTitle}?`,
        [
          {
            text: "Yes",
            onPress: async () => {
              Expo.Amplitude.logEventWithProperties("AddLeagueFromLink", {
                leagueId
              });
              await this.props.addLeagueIdMutation({ variables: { leagueId } });
              this.props.openLeaguesList();
            }
          },
          { text: "Cancel", style: "cancel" }
        ]
      );
    }
  };

  render() {
    return null;
  }
}

export default compose(graphql(ADD_LEAGUE_ID, { name: "addLeagueIdMutation" }))(
  AddLeagueFromLink
);
