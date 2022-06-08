import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import moment from "moment";

import { ErrorText, ScrollBackground, SectionHeaderText } from "../elements";
import { useDeleteGame } from "../../hooks/deleteGame";
import GameRow from "./GameRow";

const DeleteText = styled(ErrorText)`
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
`;

const Game = ({ game, leagueId, navigation }) => {
  const dateString = moment(game.date).format("MMMM Do YYYY, h:mm a");
  const { deleteGame } = useDeleteGame(leagueId, {
    onSuccess: () => navigation.goBack()
  });
  return (
    <ScrollBackground>
      <SectionHeaderText>{dateString}</SectionHeaderText>
      <GameRow game={game} leagueId={leagueId} />
      <TouchableOpacity onPress={() => deleteGame({ id: game.id })}>
        <DeleteText>Delete Game</DeleteText>
      </TouchableOpacity>
    </ScrollBackground>
  );
};

export default Game;
