import React from "react";
import { TouchableHighlight } from "react-native";
import Team from "./Team";
import styled from "styled-components/native";

import { CenteredText, Row, HighlightedText } from "../elements";
import { useDeleteGame } from "../../hooks/deleteGame";

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
  const { deleteGame } = useDeleteGame(leagueId);
  return (
    <TouchableHighlight
      onLongPress={() => deleteGame({ id: game.id })}
      onPress={onPress}
    >
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
};

export default GameRow;
