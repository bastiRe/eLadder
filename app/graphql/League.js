import gql from 'graphql-tag';

const LEAGUE = gql`
  query League($leagueId: String!) {
    league(id: $leagueId) {
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

export default LEAGUE;
