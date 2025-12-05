import { apolloClient } from "@user-interface/apollo.js";
import { CREATE_COMMENT } from "../apollo/queries";

export default class {
  static async createComment(variables) {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_COMMENT,
      variables,
    });
    return data;
  }
}
