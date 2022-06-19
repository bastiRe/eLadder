import React, { useState, useEffect, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LeagueIdsProvider } from "./context/LeagueIds";
import { StatusBar, Platform, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import * as Amplitude from "expo-analytics-amplitude";
import * as Sentry from "sentry-expo";

import { AppNavigator } from "./navigation/AppNavigator";

const { sentryDsn, amplitudeKey } = Constants.manifest.extra;

Sentry.init({
  dsn: sentryDsn,
  enableInExpoDevelopment: true,
  debug: true // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

Amplitude.initializeAsync(amplitudeKey);

const queryClient = new QueryClient();

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    Amplitude.logEventAsync("OpenApp");
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
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
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <LeagueIdsProvider>
      <QueryClientProvider client={queryClient}>
        {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <AppNavigator />
        </View>
      </QueryClientProvider>
    </LeagueIdsProvider>
  );
}

export default App;
