import React from "react";
import { Alert } from "react-native";
import { Mutation } from "react-apollo";
import * as Amplitude from 'expo-analytics-amplitude';
import gql from "graphql-tag";

const REMOVE_LEAGUE_ID = gql`
  mutation removeLeagueId($leagueId: String) {
    removeLeagueId(leagueId: $leagueId) @client
  }
`;

const RemoveLeagueMutation = ({ children, leagueId }) => {
  return (
    <Mutation mutation={REMOVE_LEAGUE_ID}>
      {(removeLeagueId, { loading }) => {
        const removeLeagueHandler = () =>
          new Promise(resolve => {
            Alert.alert(
              "Remove League?",
              "Do you really want to remove this league from your device?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => resolve(false)
                },
                {
                  text: "OK",
                  onPress: async () => {
                    await removeLeagueId({ variables: { leagueId } });
                    Amplitude.logEventWithPropertiesAsync("RemoveLeague", {
                      leagueId
                    });
                    resolve(true);
                  }
                }
              ]
            );
          });
        return children({ removeLeagueHandler, loading });
      }}
    </Mutation>
  );
};

export default RemoveLeagueMutation;
