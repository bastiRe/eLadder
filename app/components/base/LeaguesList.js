import React from "react";
import { FlatList } from "react-native";
import { FloatingAction } from "react-native-floating-action";

import LeagueItem from "../base/LeagueItem";
import * as Colors from "../../constants/Colors";
import EmptyList from "../base/EmptyList";
import { Background } from "../elements";

function LeaguesList({
  leagues,
  openLeagueScanner,
  openCreateLeague,
  openLeague,
  refetch,
  refreshing
}) {
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
        return openLeagueScanner();
      case actionNames.newLeague:
        return openCreateLeague();
      default:
        return null;
    }
  };

  return (
    <Background>
      <FlatList
        contentInset={{ bottom: 80 }}
        data={leagues}
        onRefresh={refetch}
        refreshing={refreshing}
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
            openLeague={openLeague}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <FloatingAction
        actions={actions}
        color={Colors.Primary}
        onPressItem={onPressAction}
      />
    </Background>
  );
}

export default LeaguesList;
