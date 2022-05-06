import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LeaguesListScreen from "../components/screens/LeaguesListScreen";
import LeagueScreen from "../components/screens/LeagueScreen";
import PlayerScreen from "../components/screens/PlayerScreen";
import GameScreen from "../components/screens/GameScreen";
import CreateLeagueScreen from "../components/screens/CreateLeagueScreen";
import AddPlayerScreen from "../components/screens/AddPlayerScreen";
import ShareLeagueScreen from "../components/screens/ShareLeagueScreen";
import LeagueScannerScreen from "../components/screens/LeagueScannerScreen";
import CreateGameScreen from "../components/screens/CreateGameScreen";
import CloseButton from "../components/base/CloseButton";
import LeagueOptions from "../components/base/LeagueOptions";

import Colors from "../constants/Colors";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.TextOnPrimary,
    card: Colors.Primary,
    text: Colors.TextOnPrimary,
    border: Colors.TextOnPrimary
  }
};

const RootStack = createStackNavigator();

export function RootStackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          name="leaguesList"
          component={LeaguesListScreen}
          options={{ title: "Leagues" }}
        />
        <RootStack.Screen
          name="league"
          component={LeagueScreen}
          options={({ route, navigation }) => ({
            title: route.params.leagueTitle,
            headerRight: () => (
              <LeagueOptions navigation={navigation} route={route} />
            )
          })}
        />
        <RootStack.Screen
          name="player"
          component={PlayerScreen}
          options={({ route }) => ({ title: route.params.player.name })}
        />
        <RootStack.Screen
          name="game"
          component={GameScreen}
          options={{ title: "Game" }}
        />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={({ navigation }) => ({
          presentation: "modal",
          headerTintColor: Colors.Primary,
          headerStyle: {
            backgroundColor: Colors.TextOnPrimary,
            borderColor: Colors.TextOnPrimary
          },
          headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />
        })}
      >
        <RootStack.Screen
          name="createLeague"
          component={CreateLeagueScreen}
          options={{ title: "Create League" }}
        />
        <RootStack.Screen
          name="createGame"
          component={CreateGameScreen}
          options={{ title: "Create Game" }}
        />
        <RootStack.Screen
          name="addPlayer"
          component={AddPlayerScreen}
          options={{ title: "Add Player" }}
        />
        <RootStack.Screen
          name="leagueScanner"
          options={{ title: "Add League via QR code" }}
          component={LeagueScannerScreen}
        />
        <RootStack.Screen
          name="shareLeague"
          component={ShareLeagueScreen}
          options={{ title: "Share League" }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

export const AppNavigator = props => {
  return (
    <NavigationContainer theme={theme} {...props}>
      <RootStackScreen />
    </NavigationContainer>
  );
};
