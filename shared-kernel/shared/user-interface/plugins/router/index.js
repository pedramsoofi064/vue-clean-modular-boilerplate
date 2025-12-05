import router from "@user-interface/shared/router";

export default {
  name: "router",
  parallel: true,
  setup(app) {
    app.use(router);
  },
};
