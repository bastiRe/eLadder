import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import { FloatingAction } from "react-native-floating-action";

import LeagueItem from "../base/LeagueItem";
import * as Colors from "../../constants/Colors";
import EmptyList from "../base/EmptyList";
import { Background } from "../elements";

class LeaguesList extends PureComponent {
  render() {
    const actionNames = {
      qrCode: "qrCode",
      newLeague: "newLeague"
    };

    const actions = [
      {
        text: "Add with QR-Code",
        name: actionNames.qrCode,
        color: Colors.Secondary,
        icon: require("../../assets/icons/qr_code_scanner_white.png"),
        buttonSize: 50,
        size: 50
      },
      {
        text: "Create new league",
        name: actionNames.newLeague,
        color: Colors.Secondary,
        icon: require("../../assets/icons/playlist_add_white.png"),
        buttonSize: 50,
        size: 50
      }
    ];

    const onPressAction = name => {
      switch (name) {
        case actionNames.qrCode:
          return this.props.openLeagueScanner();
        case actionNames.newLeague:
          return this.props.openCreateLeague();
        default:
          return null;
      }
    };

    return (
      <Background>
        <FlatList
          contentInset={{ bottom: 80 }}
          data={this.props.leagues}
          onRefresh={this.props.refetch}
          refreshing={this.props.refreshing}
          ListEmptyComponent={() => (
            <EmptyList
              title="Welcome to eLadder"
              text={`As soon as you add a new league or get invited, it will appear here. \n\n Tap the + icon below to add your first league.`}
            />
          )}
          renderItem={data => (
            <LeagueItem
              league={data.item}
              key={data.index}
              openLeague={this.props.openLeague}
            />
          )}
          keyExtractor={(data, index) => index.toString()}
        />
        <FloatingAction
          actions={actions}
          color={Colors.Primary}
          onPressItem={onPressAction}
        />
      </Background>
    );
  }
}

export default LeaguesList;
