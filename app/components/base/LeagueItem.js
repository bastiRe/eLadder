import {
  Alert,
  StyleSheet,
  TouchableHighlight,
  View,
  ActivityIndicator
} from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { TitleText, LightText, Item, ItemTitle } from "../elements";

const REMOVE_LEAGUE_ID = gql`
  mutation removeLeagueId($leagueId: String) {
    removeLeagueId(leagueId: $leagueId) @client
  }
`;

const styles = StyleSheet.create({
  stats: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const LeagueItem = ({ openLeague, league }) => {
  return (
    <Mutation mutation={REMOVE_LEAGUE_ID}>
      {(removeLeagueId, { data, loading }) => {
        const onLongPress = () =>
          Alert.alert(
            "Remove League?",
            "Do you really want to remove this league?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "OK",
                onPress: () =>
                  removeLeagueId({ variables: { leagueId: league.id } })
              }
            ]
          );
        return (
          <TouchableHighlight
            onPress={() => openLeague(league.id, league.title)}
            disabled={loading}
            onLongPress={onLongPress}
          >
            <Item>
              <ItemTitle>
                <TitleText>{league.title}</TitleText>
              </ItemTitle>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View style={styles.stats}>
                  <LightText>Players: {league.players.length}</LightText>
                  <LightText>Games: {league.games.length}</LightText>
                </View>
              )}
            </Item>
          </TouchableHighlight>
        );
      }}
    </Mutation>
  );
};

export default LeagueItem;
