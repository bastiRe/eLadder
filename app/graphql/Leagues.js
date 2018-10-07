import gql from 'graphql-tag';

const LEAGUES = gql`
  query Leagues($leagueIds: [String!]!) {
    leagues(ids: $leagueIds) {
      id
      title
      players {
        id
        name
      }
      games {
        id
        date
        teams {
          score
          players {
            id
            name
          }
        }
      }
    }
  }
`;

export default LEAGUES;
