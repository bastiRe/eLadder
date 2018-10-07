import gql from "graphql-tag";

const LEAGUE_IDS = gql`
  {
    leagueIds @client
  }
`;

export default LEAGUE_IDS;
