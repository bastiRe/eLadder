import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { withNavigation } from "react-navigation";

import { ErrorText, ScrollBackground } from "../elements";
import DeletePlayerMutation from "../graphql/DeletePlayerMutation";
import PointsHistoryCard from "./PointsHistoryCard";
import PlayerStatsCard from "./PlayerStatsCard";

const DeleteText = styled(ErrorText)`
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
`;

const Player = ({ player, leagueId, navigation }) => {
  return (
    <ScrollBackground>
      <PlayerStatsCard player={player} />
      <PointsHistoryCard pointsHistory={player.pointsHistory} />

      <DeletePlayerMutation player={player} leagueId={leagueId}>
        {({ deletePlayerHandler }) => {
          const onPress = async () => {
            const deleted = await deletePlayerHandler();
            return deleted && navigation.goBack();
          };

          return (
            <TouchableOpacity onPress={onPress}>
              <DeleteText>Delete Player</DeleteText>
            </TouchableOpacity>
          );
        }}
      </DeletePlayerMutation>
    </ScrollBackground>
  );
};

export default withNavigation(Player);
