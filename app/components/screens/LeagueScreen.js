import React from "react";
import { StyleSheet, Share, ActivityIndicator } from "react-native";
import { Amplitude } from "expo";
import { Query } from "react-apollo";
import { Feather } from "@expo/vector-icons";
import HeaderButtons from "react-navigation-header-buttons";
import League from "../base/League";
import LEAGUE from "../../graphql/League";
import * as Colors from "../../constants/Colors";
import computeStandings from "../../helpers/computeStandings";

class LeagueScreen extends React.Component {
  state = {
    selectedTab: "Table"
  };

  constructor(props) {
    super(props);
    this.props.navigation.setParams({ shareLeague: this._shareLeague });
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: navigation.state.params.leagueTitle,
      headerStyle: styles.header,
      headerRight: (
        <HeaderButtons
          IconComponent={Feather}
          iconSize={23}
          color={Colors.TextOnPrimary}
        >
          <HeaderButtons.Item
            title="share league"
            onPress={params.shareLeague}
            iconName="share"
          />
        </HeaderButtons>
      )
    };
  };

  _openCreateGame(league) {
    this.props.navigation.navigate("CreateGame", {
      players: league.players,
      leagueId: league.id
    });
    setTimeout(() => this.setState({ selectedTab: "Games" }), 200);
  }

  _openAddPlayer(league) {
    this.props.navigation.navigate("AddPlayer", {
      players: league.players,
      leagueId: league.id
    });
    setTimeout(() => this.setState({ selectedTab: "Table" }), 200);
  }

  _openPlayer(player) {
    if (this.props.navigation.isFocused()) {
      this.props.navigation.navigate("Player", {
        player,
        leagueId: this.props.navigation.state.params.leagueId
      });
    }
  }

  _shareLeague = () => {
    const { leagueId, leagueTitle } = this.props.navigation.state.params;
    const url = "https://eladder-app.com/add_league?";
    Share.share({
      message: `${url}leagueId=${leagueId}&leagueTitle=${leagueTitle}`,
      title: "Sharing eLadder league"
    }).then(() => {
      // No way on Android to discover if the share was successful
      Amplitude.logEventWithProperties("AttemptedToShareLeague", { leagueId });
    });
  };

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
