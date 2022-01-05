import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { ApolloProvider } from "react-apollo";
import AppLoading from 'expo-app-loading';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as Amplitude from 'expo-analytics-amplitude';
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import * as  Sentry from "sentry-expo";

import { client, persistor } from "./createApolloClient";
import RootNavigation from "./navigation/RootNavigation";

const { sentryDsn, amplitudeKey } = Constants.manifest.extra;

Sentry.init({
  dsn: sentryDsn,
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

Amplitude.initialize(amplitudeKey);

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  async _prepareApp() {
    await Promise.all([this._loadCache(), ...this._loadFonts()]);
  }

  _loadFonts() {
    const fonts = [Ionicons.font, Feather.font, MaterialIcons.font];
    return fonts.map(font => Font.loadAsync(font));
  }

  async _loadCache() {
    await persistor.restore();
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadCache}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    Amplitude.logEvent("OpenApp");

    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
          <RootNavigation />
        </View>
      </ApolloProvider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
