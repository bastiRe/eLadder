import gql from "graphql-tag";

const CREATE_LEAGUE = gql`
  mutation CreateLeague($title: String!) {
    createLeague(title: $title) {
      league {
        id
      }
    }
  }
`;

export default CREATE_LEAGUE;
