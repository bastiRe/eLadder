import React from "react";
import * as Amplitude from "expo-analytics-amplitude";

import { useLeagueIds } from "../../context/LeagueIds";
import LeagueScanner from "../base/LeagueScanner";
import { ModalBackground } from "../elements";

function LeagueScannerScreen({ navigation }) {
  const { addLeagueId } = useLeagueIds();
  const wrappedAddLeagueId = leagueId => {
    addLeagueId({ leagueId });
    Amplitude.logEventWithPropertiesAsync("AddLeagueFromQRCode", {
      leagueId
    });
    navigation.goBack();
  };

  return (
    <ModalBackground>
      <LeagueScanner addLeagueId={wrappedAddLeagueId} />;
    </ModalBackground>
  );
}

export default LeagueScannerScreen;
