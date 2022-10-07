import React from "react";
import { ComputedGame } from "../../types/computed";
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

interface GameRowProps {
  game: ComputedGame;
  leagueId: string;
  onPress: any;
}

const GameRow = ({ game, leagueId, onPress }: GameRowProps) => {
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
        <Team team={game.teams.filter((teamPlayer) => teamPlayer.team_id === 0)} />
        <ScoreText>
          {" "}
          {game.scores[0]}:{game.scores[1]}{" "}
        </ScoreText>
        <Team team={game.teams.filter((teamPlayer) => teamPlayer.team_id === 1)} align="right" />
        <Points>
          {game.points <= 0 ? "+" : "-"}
          {Math.abs(game.points)}
        </Points>
      </RowContainer>
    </TouchableHighlight>
  );
};

export default GameRow;
