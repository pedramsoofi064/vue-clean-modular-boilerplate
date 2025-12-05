import { ROUTES } from "@UI/apply/constants";

export default [
  {
    name: ROUTES.rootName,
    path: ROUTES.routePath,
    component: () => import("../views/apply.view.vue"),

    meta: {
      layout: ROUTES.layoutName,
    },
  },
];
