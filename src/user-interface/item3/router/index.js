import { ROUTES } from "@UI/item3/constants";

export default [
  {
    name: ROUTES.rootName,
    path: ROUTES.routePath,
    component: () => import("../views/item3.view.vue"),
    meta: {
      layout: ROUTES.layoutName,
    },
  },
];

