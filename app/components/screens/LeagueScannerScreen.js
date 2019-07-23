import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import * as Amplitude from 'expo-analytics-amplitude';

import AddLeagueIdMutation from "../graphql/AddLeagueIdMutation";
import LeagueScanner from "../base/LeagueScanner";
import { ModalBackground } from "../elements";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    elevation: 0
  }
});

class LeagueScannerScreen extends React.Component {
  static navigationOptions = {
    title: "Scan League QR-Code",
    headerStyle: styles.header
  };

  render() {
    return (
      <AddLeagueIdMutation>
        {(addLeagueId, { loading }) => {
          const wrappedAddLeagueId = async leagueId => {
            await addLeagueId({ leagueId });
            Amplitude.logEventWithProperties("AddLeagueFromQRCode", {
              leagueId
            });
            this.props.navigation.goBack();
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
}

export default LeagueScannerScreen;
