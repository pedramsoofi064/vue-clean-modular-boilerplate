import { main as service } from "@BL/main/services";

export default {
  async createComment(variables) {
    try {
      const response = await service.createComment(variables);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
