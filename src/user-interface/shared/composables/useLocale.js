import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

export function useLocale() {
  const { locale } = useI18n();
  const route = useRoute();
  const router = useRouter();

  const applyHtmlDirLang = (loc) => {
    document.documentElement.setAttribute("lang", loc);
    document.documentElement.setAttribute("dir", loc === "fa" ? "rtl" : "ltr");
  };

  const setLocaleAll = async (loc) => {
    locale.value = loc;

    applyHtmlDirLang(loc);

    localStorage.setItem("app_locale", loc);

    if ("locale" in route.params) {
      await router.replace({
        name: route.name,
        params: { ...route.params, locale: loc },
      });
    }
  };

  const toggleLocale = () => {
    const next = locale.value === "fa" ? "en" : "fa";
    return setLocaleAll(next);
  };

  return { locale, setLocaleAll, toggleLocale };
}
