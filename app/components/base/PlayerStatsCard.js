import React from "react";
import styled from "styled-components";

import { Row, CardTitleText, Card, Text, LightText } from "../elements";

const StatsCard = styled(Card)`
  padding: 0px;
`;

const computeNemesisAndVictim = opponentHistory => {
  return Object.keys(opponentHistory).reduce((memo, key) => {
    const opponent = opponentHistory[key];
    let percentage;
    if (opponent.losses === 0) {
      percentage = 1;
    } else if (opponent.wins === 0) {
      percentage = 0;
    } else {
      percentage = opponent.wins / (opponent.wins + opponent.losses);
    }
    if (
      percentage > 0 &&
      (!memo.victim || percentage > memo.victim.percentage)
    ) {
      memo.victim = { name: key, percentage };
    }
    if (
      percentage < 1 &&
      (!memo.nemesis || percentage > memo.nemesis.percentage)
    ) {
      memo.nemesis = { name: key, percentage };
    }
    return memo;
  }, {});
};

const PlayerStatsCard = ({ player }) => {
  const { nemesis, victim } = computeNemesisAndVictim(player.opponentHistory);
  return (
    <React.Fragment>
      <CardTitleText>Current Stats</CardTitleText>
      <StatsCard>
        <Row>
          <Text>Points</Text>
          <LightText>{player.points}</LightText>
        </Row>
        <Row>
          <Text>Wins/Loss/Draw</Text>
          <LightText>
            {player.wins}/{player.draws}/{player.losses}
          </LightText>
        </Row>
        <Row>
          <Text>Goals (Shot/Conceded)</Text>
          <LightText>
            {player.goalsShot}/{player.goalsConceded}
          </LightText>
        </Row>
        <Row>
          <Text>Best against (Win-Percentage)</Text>
          <LightText>
            {victim && `${victim.name} (${victim.percentage * 100}%)`}
          </LightText>
        </Row>
        <Row>
          <Text>Worst against (Win-Percentage)</Text>
          <LightText>
            {nemesis && `${nemesis.name} (${nemesis.percentage * 100}%)`}
          </LightText>
        </Row>
      </StatsCard>
    </React.Fragment>
  );
};

export default PlayerStatsCard;
