import React from "react";
import { Teams } from "../../graphql/generated";
import styled from "styled-components/native";
import { Text } from "../elements";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
`;

const Name = styled(Text)`
  height: 20px;
`;

interface TeamProps {
  team: Teams[];
  align?: "left" | "right";
}

const Team = ({ team, align = "left" }: TeamProps) => {
  const playerAlign = {
    textAlign: align === "left" ? "left" : "right"
  };
  return (
    <Container>
      {team.map(p => (
        <Name
          numberOfLines={1}
          ellipsizeMode="tail"
          key={p.player.name}
          style={[playerAlign]}
        >
          {p.player.name}
        </Name>
      ))}
    </Container>
  );
};

export default Team;
