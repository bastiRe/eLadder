import React from "react";
import { Share, View } from "react-native";
import { Amplitude } from "expo";
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
  margin-top: 40px;
`;

class ShareLeague extends React.Component {
  _openShareDialog() {
    const { leagueId, leagueTitle } = this.props;
    const url = "https://eladder-app.com/add_league?";
    Share.share({
      message: `${url}leagueId=${leagueId}&leagueTitle=${leagueTitle}`,
      title: "Sharing eLadder league"
    }).then(() => {
      // No way on Android to discover if the share was successful
      Amplitude.logEventWithProperties("AttemptedToShareLeague", { leagueId });
    });
  }

  render() {
    const { leagueId, leagueTitle } = this.props;
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
        <PaddedView>
          <QRCode
            value={JSON.stringify({ leagueId, leagueTitle })}
            size={160}
            bgColor={Colors.Text}
          />
        </PaddedView>
      </Container>
    );
  }
}

export default ShareLeague;
