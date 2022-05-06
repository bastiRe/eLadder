import React, { useState, useEffect } from "react";
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

function LeagueScanner({ addLeagueId }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === "granted") {
        setHasCameraPermission(true);
      } else {
        setHasCameraPermission(false);
      }
    };
    requestCameraPermission();
  }, []);

  const handleBarCodeRead = ({ data }) => {
    const { hostname, query } = parseUrl(data, true);
    const { leagueId, leagueTitle } = query;
    const validUrl = hostname === "eladder-app.com" && leagueTitle && leagueId;

    if (validUrl && isAlertOpen === false) {
      setIsAlertOpen(true);
      Alert.alert(
        `Add league?`,
        `Do you want to add the league ${leagueTitle}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setIsAlertOpen(false)
          },
          {
            text: "OK",
            onPress: () => {
              addLeagueId(leagueId);
            }
          }
        ]
      );
    }
  };

  let content;
  if (hasCameraPermission === null) {
    content = (
      <CenteredText>
        Requesting camera permission to scan a league code.
      </CenteredText>
    );
  } else if (hasCameraPermission === false) {
    content = (
      <CenteredText>
        eLadder needs camera permission to scan a league code.
      </CenteredText>
    );
  } else {
    content = (
      <>
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={handleBarCodeRead}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
        <OverlayContainer>
          <Overlay />
        </OverlayContainer>
      </>
    );
  }

  return <Container>{content}</Container>;
}

export default LeagueScanner;
