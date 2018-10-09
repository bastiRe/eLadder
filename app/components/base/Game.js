import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import moment from "moment";

import { ErrorText, ScrollBackground, SectionHeaderText } from "../elements";
import DeleteGameMutation from "../graphql/DeleteGameMutation";
import GameRow from "./GameRow";

const DeleteText = styled(ErrorText)`
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
`;

const Game = ({ game, leagueId, navigation }) => {
  const dateString = moment(game.date).format("MMMM Do YYYY, h:mm a");
  return (
    <ScrollBackground>
      <SectionHeaderText>{dateString}</SectionHeaderText>
      <GameRow game={game} leagueId={leagueId} />
      <DeleteGameMutation game={game} leagueId={leagueId}>
        {({ deleteGameHandler }) => {
          const onPress = async () => {
            const deleted = await deleteGameHandler();
            return deleted && navigation.goBack();
          };

          return (
            <TouchableOpacity onPress={onPress}>
              <DeleteText>Delete Game</DeleteText>
            </TouchableOpacity>
          );
        }}
      </DeleteGameMutation>
    </ScrollBackground>
  );
};

export default Game;
