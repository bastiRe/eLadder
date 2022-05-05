import React from "react";
import * as Amplitude from 'expo-analytics-amplitude';
import { withNavigation } from "react-navigation";

import HeaderDropdown from "../base/HeaderDropdown";
import RemoveLeagueMutation from "../graphql/RemoveLeagueMutation";

class LeagueOptions extends React.PureComponent {
  _shareLeague = () => {
    const { leagueId, leagueTitle } = this.props;
    Amplitude.logEventWithPropertiesAsync("OpenShareLeague", {
      leagueId
    });
    this.props.navigation.navigate("ShareLeague", {
      leagueId,
      leagueTitle
    });
  };

  render() {
    return (
      <RemoveLeagueMutation leagueId={this.props.leagueId}>
        {({ removeLeagueHandler }) => (
          <HeaderDropdown
            options={[
              {
                label: "Share League",
                onSelect: () => {
                  this._shareLeague();
                }
              },
              {
                label: "Delete League",
                onSelect: async () => {
                  const removed = await removeLeagueHandler();
                  if (removed) {
                    this.props.navigation.goBack();
                  }
                }
              }
            ]}
          />
        )}
      </RemoveLeagueMutation>
    );
  }
}

export default withNavigation(LeagueOptions);
