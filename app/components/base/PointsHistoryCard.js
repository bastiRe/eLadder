import React from "react";
import styled from "styled-components/native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis
} from "victory-native";

import { CardTitleText, Card, Text } from "../elements";

const CenteredText = styled(Text)`
  padding: 30px 0;
  text-align: center;
`;

const PointsHistoryCard = ({ pointsHistory }) => {
  let chart;
  if (pointsHistory.length > 1) {
    const formattedPointsHistory = pointsHistory.map((points, index) => ({
      games: index.toString(),
      points: points
    }));
    chart = (
      <VictoryChart
        height={200}
        padding={{ top: 20, left: 50, right: 30, bottom: 50 }}
        theme={VictoryTheme.material}
      >
        <VictoryLine data={formattedPointsHistory} x="games" y="points" />
        <VictoryAxis
          tickCount={5}
          label="Games"
          style={{ axisLabel: { padding: 30 } }}
        />
        <VictoryAxis dependentAxis tickCount={5} />
      </VictoryChart>
    );
  } else {
    chart = <CenteredText>No games played yet.</CenteredText>;
  }

  return (
    <React.Fragment>
      <CardTitleText>Points History</CardTitleText>
      <Card>{chart}</Card>
    </React.Fragment>
  );
};

export default PointsHistoryCard;
