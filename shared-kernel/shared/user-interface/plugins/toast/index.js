import { BREAKPOINTS } from "@user-interface/shared/constants";

import toast from "@cross-cutting/libs/toast.lib";

export const INJECTION_KEY = Symbol("toast");

export default {
  name: "toast",
  parallel: true,
  setup(app) {
    const position = window.innerWidth <= BREAKPOINTS.small ? "top-center" : "top-right";

    toast.setConfig({ position, stackMaxToast: 5, duration: 8000 });

    app.provide(INJECTION_KEY, toast);
  },
};
