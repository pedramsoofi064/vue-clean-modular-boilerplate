import { apply as repository } from "../repositories";

export default class {
  static async createApplication(payload) {
    const response = await repository.createApplication(payload);
    return response?.createApplication || response;
  }
}

