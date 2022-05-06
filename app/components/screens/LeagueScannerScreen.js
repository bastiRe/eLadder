import React from "react";
import { ActivityIndicator } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";

import AddLeagueIdMutation from "../graphql/AddLeagueIdMutation";
import LeagueScanner from "../base/LeagueScanner";
import { ModalBackground } from "../elements";

function LeagueScannerScreen({ navigation }) {
  return (
    <AddLeagueIdMutation>
      {(addLeagueId, { loading }) => {
        const wrappedAddLeagueId = async leagueId => {
          await addLeagueId({ leagueId });
          Amplitude.logEventWithPropertiesAsync("AddLeagueFromQRCode", {
            leagueId
          });
          navigation.goBack();
        };
        let content;
        if (loading) {
          content = <ActivityIndicator />;
        } else {
          content = <LeagueScanner addLeagueId={wrappedAddLeagueId} />;
        }
        return <ModalBackground>{content}</ModalBackground>;
      }}
    </AddLeagueIdMutation>
  );
}

export default LeagueScannerScreen;
