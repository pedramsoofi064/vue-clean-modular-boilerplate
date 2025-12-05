import { apolloClient } from "@user-interface/apollo.js";
import { CREATE_APPLICATION } from "../apollo/queries";

export default class {
  static async createApplication(payload) {
    const uploadVariables = { ...payload };
    if (uploadVariables.resume && typeof uploadVariables.resume === 'object' && uploadVariables.resume.upload) {
      uploadVariables.resume = uploadVariables.resume.upload;
    }
    
    const { data } = await apolloClient.mutate({
      mutation: CREATE_APPLICATION,
      variables: uploadVariables,
    });
    return data;
  }
}

