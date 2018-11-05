import React from "react";
import { Share, View } from "react-native";
import { Amplitude, takeSnapshotAsync, Permissions, MediaLibrary } from "expo";
import styled from "styled-components";
import QRCode from "react-native-qrcode";

import Button from "./Button";
import { LightText, TitleText } from "../elements";
import Colors from "../../constants/Colors";

const Container = styled.View`
  align-items: center;
`;

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

const PaddedView = styled(View)`
  margin-top: 20px;
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
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (permission.status === "granted") {
      const uri = await takeSnapshotAsync(this.qrCodeRef.current, {
        format: "png",
        result: "file"
      });
      await MediaLibrary.createAssetAsync(uri);
    }
  }

  render() {
    const { leagueTitle } = this.props;
    return (
      <Container>
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
          <QRCode value={this.state.url} size={160} bgColor={Colors.Text} />
        </PaddedView>
        <PaddedButton
          title="Save QR-Code"
          type="primary"
          onPress={this._takeScreenshot.bind(this)}
        />
      </Container>
    );
  }
}

export default ShareLeague;
