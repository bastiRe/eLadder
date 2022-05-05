import React from "react";
import { Alert, Share, ScrollView } from "react-native";
import Sentry from "sentry-expo";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Amplitude from "expo-analytics-amplitude";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";

import Button from "./Button";
import { LightText, TitleText } from "../elements";
import Colors from "../../constants/Colors";

const Divider = styled.View`
  height: 1px;
  background-color: ${Colors.Border};
  flex: 1;
  margin: 0 20px;
`;

const Row = styled.View`
  margin: 20px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DividerText = styled(LightText)`
  font-size: 24px;
`;

const PaddedText = styled(TitleText)`
  margin: 20px;
`;

const PaddedButton = styled(Button)`
  margin: 20px 0;
`;

const PaddedView = styled.View`
  margin-top: 20px;
  background-color: white;
  padding: 20px;
`;

class ShareLeague extends React.Component {
  constructor(props) {
    super(props);
    const { leagueId, leagueTitle } = props;
    this.qrCodeRef = React.createRef();
    this.state = {
      url: `https://eladder-app.com/add_league?leagueId=${leagueId}&leagueTitle=${leagueTitle}`
    };
  }
  _openShareDialog() {
    const { leagueId } = this.props;
    Share.share({
      message: this.state.url,
      title: "Sharing eLadder league"
    }).then(() => {
      // No way on Android to discover if the share was successful
      Amplitude.logEventWithProperties("AttemptedToShareLeague", { leagueId });
    });
  }

  async _takeScreenshot() {
    const { leagueId } = this.props;

    Amplitude.logEventWithProperties("TakeQrCodeScreenshot", { leagueId });
    const { status } = await MediaLibrary.usePermissions();

    if (status === "granted") {
      try {
        const uri = await captureRef(this.qrCodeRef, {
          format: "png"
        });
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("QR-Code successfully saved.");
      } catch (error) {
        Sentry.captureException(error);
      }
    }
  }

  render() {
    const { leagueTitle } = this.props;
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <PaddedText>You can share {leagueTitle} League in two ways:</PaddedText>
        <PaddedButton
          title="Share link"
          type="primary"
          onPress={this._openShareDialog.bind(this)}
        />
        <Row>
          <Divider />
          <DividerText>or</DividerText>
          <Divider />
        </Row>
        <PaddedText>Scan the QR Code with another eLadder app:</PaddedText>
        <PaddedView ref={this.qrCodeRef}>
          <QRCode
            value={this.state.url}
            size={160}
            backgroundColor={Colors.Text}
          />
        </PaddedView>
        <PaddedButton
          title="Save QR-Code"
          type="primary"
          onPress={this._takeScreenshot.bind(this)}
        />
      </ScrollView>
    );
  }
}

export default ShareLeague;
