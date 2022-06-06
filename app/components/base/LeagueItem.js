import React from "react";
import { TouchableHighlight, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useLeagueIds } from "../../context/LeagueIds";

import { Row, TitleText, LightText, Item, ItemTitle } from "../elements";

const Stats = styled(Row)`
  height: 40px;
  border-bottom-width: 0;
  flex: 1;
`;

const LeagueItem = ({ openLeague, league }) => {
  const { removeLeagueId } = useLeagueIds();
  return (
    <TouchableHighlight
      onPress={() => openLeague(league.id, league.title)}
      onLongPress={() => removeLeagueId(league.id)}
    >
      <Item>
        <ItemTitle>
          <TitleText>{league.title}</TitleText>
        </ItemTitle>
        <Stats>
          <LightText>Players: {league.players.length}</LightText>
          <LightText>Games: {league.games.length}</LightText>
        </Stats>
      </Item>
    </TouchableHighlight>
  );
};

export default LeagueItem;
