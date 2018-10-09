import React from "react";
import { TouchableHighlight } from "react-native";
import Team from "./Team";
import styled from "styled-components";

import DeleteGameMutation from "../graphql/DeleteGameMutation";
import { CenteredText, Row, HighlightedText } from "../elements";

const RowContainer = styled(Row)`
  height: 60px;
`;

const Points = styled(HighlightedText)`
  text-align: center;
  height: 20;
  width: 50;
`;

const ScoreContainer = styled.View`
  width: 40;
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
              <ScoreContainer>
                <CenteredText>
                  {" "}
                  {game.teams[0].score}:{game.teams[1].score}{" "}
                </CenteredText>
              </ScoreContainer>
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
