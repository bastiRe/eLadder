import React from "react";
import { TouchableHighlight } from "react-native";
import Team from "./Team";
import styled from "styled-components/native";

import DeleteGameMutation from "../graphql/DeleteGameMutation";
import { CenteredText, Row, HighlightedText } from "../elements";

const RowContainer = styled(Row)`
  height: 60px;
`;

const Points = styled(HighlightedText)`
  text-align: center;
  height: 20px;
  width: 50px;
`;

const ScoreText = styled(CenteredText)`
  width: 60px;
`;

const GameRow = ({ game, leagueId, onPress }) => {
  return (
    <DeleteGameMutation game={game} leagueId={leagueId}>
      {({ deleteGameHandler }) => {
        return (
          <TouchableHighlight onLongPress={deleteGameHandler} onPress={onPress}>
            <RowContainer>
              <Points>
                {game.points >= 0 ? "+" : "-"}
                {Math.abs(game.points)}
              </Points>
              <Team team={game.teams[0].players} />
              <ScoreText>
                {" "}
                {game.teams[0].score}:{game.teams[1].score}{" "}
              </ScoreText>
              <Team team={game.teams[1].players} align="right" />
              <Points>
                {game.points <= 0 ? "+" : "-"}
                {Math.abs(game.points)}
              </Points>
            </RowContainer>
          </TouchableHighlight>
        );
      }}
    </DeleteGameMutation>
  );
};

export default GameRow;
