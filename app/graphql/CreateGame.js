import gql from 'graphql-tag';

const CREATE_GAME = gql`
  mutation CreateGame(
    $leagueId: String!
    $teamIds: [TeamIds]!
    $date: String!
  ) {
    createGame(leagueId: $leagueId, teamIds: $teamIds, date: $date) {
      game {
        id
      }
    }
  }
`;

export default CREATE_GAME;
