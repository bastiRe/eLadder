import React from "react";
import { TouchableHighlight, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import RemoveLeagueMutation from "../graphql/RemoveLeagueMutation";
import { Row, TitleText, LightText, Item, ItemTitle } from "../elements";

const Stats = styled(Row)`
  height: 40px;
  border-bottom-width: 0;
  flex: 1;
`;

const LeagueItem = ({ openLeague, league }) => {
  return (
    <RemoveLeagueMutation leagueId={league.id}>
      {({ removeLeagueHandler, loading }) => (
        <TouchableHighlight
          onPress={() => openLeague(league.id, league.title)}
          disabled={loading}
          onLongPress={removeLeagueHandler}
        >
          <Item>
            <ItemTitle>
              <TitleText>{league.title}</TitleText>
            </ItemTitle>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Stats>
                <LightText>Players: {league.players.length}</LightText>
                <LightText>Games: {league.games.length}</LightText>
              </Stats>
            )}
          </Item>
        </TouchableHighlight>
      )}
    </RemoveLeagueMutation>
  );
};

export default LeagueItem;
