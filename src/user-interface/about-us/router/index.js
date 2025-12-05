import { ROUTES } from "@UI/about-us/constants";

export default [
  {
    name: ROUTES.rootName,
    path: ROUTES.routePath,
    component: () => import("../views/root.view.vue"),
    meta: {
      layout: ROUTES.layoutName,
    },
    children: [
      {
        name: ROUTES.item1Name,
        path: ROUTES.item1Path,
        component: () => import("../views/item1.view.vue"),
      },
      {
        name: ROUTES.item2Name,
        path: ROUTES.item2Path,
        component: () => import("../views/item2.view.vue"),
      },
      {
        name: ROUTES.contactUsName,
        path: ROUTES.contactUsPath,
        component: () => import("../views/contactUs.view.vue"),
      },
    ],
  },
];
