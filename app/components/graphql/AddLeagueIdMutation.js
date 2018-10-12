import React from "react";
import { Mutation } from "react-apollo";

import ADD_LEAGUE_ID from "../../graphql/AddLeagueId";

const AddLeagueIdMutation = ({ children, onCompleted }) => {
  return (
    <Mutation onCompleted={onCompleted} mutation={ADD_LEAGUE_ID}>
      {(addLeagueId, options) => {
        const wrappedAddLeagueId = async ({ leagueId }) => {
          return addLeagueId({ variables: { leagueId } });
        };

        return children(wrappedAddLeagueId, options);
      }}
    </Mutation>
  );
};

export default AddLeagueIdMutation;
