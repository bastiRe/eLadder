import React from "react";
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

const Team = ({ team, align = "left" }) => {
  const playerAlign = {
    textAlign: align === "left" ? "left" : "right"
  };
  return (
    <Container>
      {team.map(p => (
        <Name
          numberOfLines={1}
          ellipsizeMode="tail"
          key={p.name}
          style={[playerAlign]}
        >
          {p.name}
        </Name>
      ))}
    </Container>
  );
};

export default Team;
