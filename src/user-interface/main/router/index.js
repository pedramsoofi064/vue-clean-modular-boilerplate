import { ROUTES } from "@UI/main/constants";

export default [
  {
    name: ROUTES.rootName,
    path: ROUTES.routePath,
    component: () => import("../views/main.view.vue"),

    meta: {
      layout: ROUTES.layoutName,
    },
  },
];
