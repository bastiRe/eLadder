import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
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

import Colors from "../constants/Colors";

const MainCardNavigator = createStackNavigator(
  {
    LeaguesList: {
      screen: LeaguesListScreen
    },
    League: {
      screen: LeagueScreen
    },
    Player: {
      screen: PlayerScreen
    },
    Game: {
      screen: GameScreen
    }
  },
  {
    defaultNavigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.Primary
      },
      headerTintColor: Colors.TextOnPrimary
    })
  }
);

const MainModalNavigator = createStackNavigator(
  {
    MainCardNavigator: {
      screen: MainCardNavigator,
      navigationOptions: {
        header: null
      }
    },
    CreateLeague: {
      screen: CreateLeagueScreen
    },
    CreateGame: {
      screen: CreateGameScreen
    },
    AddPlayer: {
      screen: AddPlayerScreen
    },
    LeagueScanner: {
      screen: LeagueScannerScreen
    },
    ShareLeague: {
      screen: ShareLeagueScreen
    }
  },
  {
    mode: "modal",
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: <CloseButton onPress={() => navigation.goBack()} />,
      headerTitleStyle: {
        fontWeight: "normal"
      },
      headerTintColor: Colors.Primary,
      headerStyle: {
        paddingTop: 24,
        elevation: 0
      }
    })
  }
);

const AppContainer = createAppContainer(MainModalNavigator);

export default class RootNavigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}
