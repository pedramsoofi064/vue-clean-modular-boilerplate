import { ROUTES } from "@UI/item1/constants";

export default [
  {
    name: ROUTES.rootName,
    path: ROUTES.routePath,
    component: () => import("../views/item1.view.vue"),
    meta: {
      layout: ROUTES.layoutName,
    },
  },
];

