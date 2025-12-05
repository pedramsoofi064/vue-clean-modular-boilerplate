import { apply as service } from "@BL/apply/services";

export default {
  async createApplication(variables) {
    this.loading = true;
    try {
      const response = await service.createApplication(variables);
      return response;
    } finally {
      this.loading = false;
    }
  },
};

