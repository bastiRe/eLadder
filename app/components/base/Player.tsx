import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { useDeletePlayer } from "../../hooks/deletePlayer";
import { ErrorText, ScrollBackground } from "../elements";
import PointsHistoryCard from "./PointsHistoryCard";
import PlayerStatsCard from "./PlayerStatsCard";

const DeleteText = styled(ErrorText)`
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
`;

const Player = ({ player, leagueId, navigation }) => {
  const { deletePlayer } = useDeletePlayer(leagueId, {
    onSuccess: () => navigation.goBack()
  });

  return (
    <ScrollBackground>
      <PlayerStatsCard player={player} />
      <PointsHistoryCard pointsHistory={player.pointsHistory} />
      <TouchableOpacity onPress={() => deletePlayer({ id: player.id })}>
        <DeleteText>Delete Player</DeleteText>
      </TouchableOpacity>
    </ScrollBackground>
  );
};

export default Player;
