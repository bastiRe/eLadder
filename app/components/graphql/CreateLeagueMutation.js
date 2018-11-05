import React from "react";
import { Mutation } from "react-apollo";
import { Amplitude } from "expo";

import CREATE_LEAGUE from "../../graphql/CreateLeague";

const CreateLeagueMutation = ({ children, onCompleted }) => {
  const wrappedOnCompleted = data => {
    const leagueId = data.createLeague.league.id;
    Amplitude.logEventWithProperties("CreateLeague", { leagueId });
    return onCompleted(data);
  };
  return (
    <Mutation mutation={CREATE_LEAGUE} onCompleted={wrappedOnCompleted}>
      {(createLeague, options) => {
        const wrappedCreateLeague = async ({ title }) => {
          return createLeague({ variables: { title } });
        };

        return children(wrappedCreateLeague, options);
      }}
    </Mutation>
  );
};

export default CreateLeagueMutation;
