import { main as repository } from "../repositories";

export default class {
  static async createComment(variables) {
    const response = await repository.createComment(variables);
    return response?.createComments || response;
  }
}
