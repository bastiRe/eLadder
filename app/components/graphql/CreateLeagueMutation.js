import React from "react";
import { Mutation } from "react-apollo";

import CREATE_LEAGUE from "../../graphql/CreateLeague";

const CreateLeagueMutation = ({ children, onCompleted }) => {
  return (
    <Mutation mutation={CREATE_LEAGUE} onCompleted={onCompleted}>
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
