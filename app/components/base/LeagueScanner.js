import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import styled from "styled-components";

import { CenteredText } from "../elements";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
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
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _handleBarCodeRead = ({ data }) => {
    const { leagueId, leagueTitle } = JSON.parse(data);

    if (leagueId && leagueTitle && this.state.alertOpen === false) {
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
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeRead={this._handleBarCodeRead}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
      );
    }

    return <Container>{content}</Container>;
  }
}

export default CreateLeagueForm;
