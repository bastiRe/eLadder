import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import * as Amplitude from 'expo-analytics-amplitude';
import { Query } from "react-apollo";

import League from "../base/League";
import LEAGUE from "../../graphql/League";
import * as Colors from "../../constants/Colors";
import computeStandings from "../../helpers/computeStandings";
import LeagueOptions from "../base/LeagueOptions";

class LeagueScreen extends React.Component {
  state = {
    selectedTab: "Table"
  };

  constructor(props) {
    super(props);
    this.props.navigation.setParams({ shareLeague: this._shareLeague });
  }

  static navigationOptions = ({ navigation }) => {
    const { leagueId, leagueTitle } = navigation.state.params;
    return {
      title: navigation.state.params.leagueTitle,
      headerStyle: styles.header,
      headerRight: (
        <LeagueOptions leagueId={leagueId} leagueTitle={leagueTitle} />
      )
    };
  };

  _openCreateGame(league) {
    Amplitude.logEventWithPropertiesAsync("OpenCreateGame", {
      leagueId: league.id
    });
    this.props.navigation.navigate("CreateGame", {
      players: league.players,
      leagueId: league.id
    });
    setTimeout(() => this.setState({ selectedTab: "Games" }), 200);
  }

  _openAddPlayer(league) {
    Amplitude.logEventWithPropertiesAsync("OpenCreatePlayer", {
      leagueId: league.id
    });
    this.props.navigation.navigate("AddPlayer", {
      players: league.players,
      leagueId: league.id
    });
    setTimeout(() => this.setState({ selectedTab: "Table" }), 200);
  }

  render() {
    const leagueId = this.props.navigation.state.params.leagueId;
    return (
      <Query
        query={LEAGUE}
        variables={{ leagueId }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch, networkStatus }) => {
          if (loading && !data.League)
            return <ActivityIndicator style={styles.activityIndicator} />;
          const league = computeStandings(data.league);

          return (
            <League
              league={league}
              refetch={refetch}
              refreshing={loading}
              selectedTab={this.state.selectedTab}
              selectTab={selectedTab => this.setState({ selectedTab })}
              openAddPlayer={() => this._openAddPlayer(data.league)}
              openCreateGame={() => this._openCreateGame(data.league)}
              openPlayer={player => this._openPlayer(player)}
            />
          );
        }}
      </Query>
    );
  }
}

export default LeagueScreen;

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    elevation: 0,
    backgroundColor: Colors.Primary
  },
  activityIndicator: {
    top: 40
  }
});
