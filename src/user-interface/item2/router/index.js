import { ROUTES } from "@UI/item2/constants";

export default [
  {
    name: ROUTES.rootName,
    path: ROUTES.routePath,
    component: () => import("../views/item2.view.vue"),
    meta: {
      layout: ROUTES.layoutName,
    },
  },
];

