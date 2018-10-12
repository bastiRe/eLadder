import React from "react";
import { Amplitude } from "expo";
import { withNavigation } from "react-navigation";

import HeaderDropdown from "../base/HeaderDropdown";
import RemoveLeagueMutation from "../graphql/RemoveLeagueMutation";

class LeagueOptions extends React.PureComponent {
  _shareLeague = () => {
    const { leagueId, leagueTitle } = this.props;
    Amplitude.logEventWithProperties("OpenShareLeague", {
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
