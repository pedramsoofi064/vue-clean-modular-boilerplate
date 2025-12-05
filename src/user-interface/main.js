import { createApp, h } from "vue";
import { pluginLoader } from "@shared-kernel/plugin-loader";
import i18n from "./i18n";
import "swiper/css";
import { ApolloClients } from "@vue/apollo-composable";
import { apolloClient } from "./apollo";
import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log("New content available. Refresh the page.");
  },
  onOfflineReady() {
    console.log("App ready to work offline.");
  },
});

import App from "./App.vue";

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});
app.use(pluginLoader);
app.use(i18n);

logVersion();
