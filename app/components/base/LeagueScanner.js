import React from "react";
import { StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import styled from "styled-components/native";
import parseUrl from "url-parse";

import { CenteredText } from "../elements";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const OverlayContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.View`
  width: 240px;
  height: 240px;
  border-radius: 16px;
  border: 3px solid white;
`;

class CreateLeagueForm extends React.Component {
  state = {
    hasCameraPermission: null,
    alertOpen: false
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _handleBarCodeRead = ({ data }) => {
    const { hostname, query } = parseUrl(data, true);
    const { leagueId, leagueTitle } = query;
    const validUrl = hostname === "eladder-app.com" && leagueTitle && leagueId;

    if (validUrl && this.state.alertOpen === false) {
      this.setState({ alertOpen: true });
      Alert.alert(
        `Add league?`,
        `Do you want to add the league ${leagueTitle}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => this.setState({ alertOpen: false })
          },
          {
            text: "OK",
            onPress: () => {
              this.props.addLeagueId(leagueId);
            }
          }
        ]
      );
    }
  };

  render() {
    let content;
    if (this.state.hasCameraPermission === null) {
      content = (
        <CenteredText>
          Requesting camera permission to scan a league code.
        </CenteredText>
      );
    } else if (this.state.hasCameraPermission === false) {
      content = (
        <CenteredText>
          eLadder needs camera permission to scan a league code.
        </CenteredText>
      );
    } else {
      content = (
        <React.Fragment>
          <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={this._handleBarCodeRead}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          />
          <OverlayContainer>
            <Overlay />
          </OverlayContainer>
        </React.Fragment>
      );
    }

    return <Container>{content}</Container>;
  }
}

export default CreateLeagueForm;
