import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { useSharedStore } from "@user-interface/shared/store";

export default {
  name: "pinia",
  parallel: true,
  dependOn: ["router"],
  setup(app) {
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedState);

    app.use(pinia);

    // initializing sharedStore
    useSharedStore();
  },
};
