import gql from 'graphql-tag';

const ADD_LEAGUE_ID = gql`
  mutation addLeagueId($leagueId: String!) {
    addLeagueId(leagueId: $leagueId) @client
  }
`;

export default ADD_LEAGUE_ID;
