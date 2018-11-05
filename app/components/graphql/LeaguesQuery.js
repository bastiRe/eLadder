import React from "react";
import { Query } from "react-apollo";

import LEAGUES from "../../graphql/Leagues.js";

const LeaguesQuery = ({ leagueIds, children }) => (
  <Query
    query={LEAGUES}
    variables={{ leagueIds }}
    fetchPolicy="cache-and-network"
  >
    {({ loading, data, refetch, networkStatus }) => {
      return children({ data, loading, refetch, networkStatus });
    }}
  </Query>
);

export default LeaguesQuery;
