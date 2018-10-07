import gql from 'graphql-tag';

const DELETE_PLAYER = gql`
  mutation deletePlayer($id: String!) {
    deletePlayer(id: $id) {
      success
    }
  }
`;

export default DELETE_PLAYER;
