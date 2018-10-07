import gql from 'graphql-tag';

const CREATE_PLAYER = gql`
  mutation createPlayer($name: String!, $leagueId: String!) {
    createPlayer(name: $name, leagueId: $leagueId) {
      player {
        id
        name
      }
    }
  }
`;

export default CREATE_PLAYER;
