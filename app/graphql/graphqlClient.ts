import { GraphQLClient } from "graphql-request";
import { endpointUrl } from "../constants/Environment";
const client = new GraphQLClient(endpointUrl);

export default client;
