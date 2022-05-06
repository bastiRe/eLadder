import React, { useState, useEffect, useCallback } from "react";
import { ApolloProvider } from "react-apollo";
import { StatusBar, Platform, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import * as Amplitude from "expo-analytics-amplitude";
import * as Sentry from "sentry-expo";

import { client, persistor } from "./createApolloClient";
import { AppNavigator } from "./navigation/AppNavigator";

const { sentryDsn, amplitudeKey } = Constants.manifest.extra;

Sentry.init({
  dsn: sentryDsn,
  enableInExpoDevelopment: true,
  debug: true // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

Amplitude.initializeAsync(amplitudeKey);

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    Amplitude.logEventAsync("OpenApp");
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        await persistor.restore();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log("hide");
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ApolloProvider client={client} onLayout={onLayoutRootView}>
      {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </ApolloProvider>
  );
}

export default App;
