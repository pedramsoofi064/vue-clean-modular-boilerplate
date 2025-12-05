import { createRouter, createWebHashHistory } from "vue-router";

import { ROUTES } from "@user-interface/shared/constants";
import i18n from "@/i18n";

const routes = import.meta.glob("@user-interface/*/router/index.js", {
  eager: true,
  import: "default",
});

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...Object.values(routes).flat(),
    {
      path: ROUTES.notFoundPath,
      name: ROUTES.notFoundName,
      component: () =>
        import("@user-interface/shared/views/not-found.view.vue"),
      meta: {
        auth: "ignore",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const urlLoc = to.params.locale;
  const stored = localStorage.getItem("app_locale");
  const loc = urlLoc || stored || "fa";

  if (!urlLoc) {
    // اگر توی URL زبان نیومده، ریدایرکت کن به همون مسیر ولی با locale
    return next({ ...to, params: { ...to.params, locale: loc } });
  }

  // ست کردن زبان برای i18n
  i18n.global.locale.value = loc;

  // ست کردن HTML attributes
  document.documentElement.setAttribute("lang", loc);
  document.documentElement.setAttribute("dir", loc === "fa" ? "rtl" : "ltr");

  // ذخیره انتخاب کاربر
  localStorage.setItem("app_locale", loc);

  next();
});

router.afterEach(() => {
  const container = document.getElementById('default-layout')
  if (container) container.scrollTo({ top: 0, behavior: 'smooth' })
})
export default router;
