import gql from 'graphql-tag';

const DELETE_GAME = gql`
  mutation deleteGame($id: String!) {
    deleteGame(id: $id) {
      success
    }
  }
`;

export default DELETE_GAME;
