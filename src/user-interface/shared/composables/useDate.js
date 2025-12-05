import { computed } from "vue";
import { useLocale } from "./useLocale";

export function useDate(date) {
  const { locale } = useLocale();

  const convertedDate = computed(() => {
    if (!date) return "";

    const d = date instanceof Date ? date : new Date(date);

    if (locale.value === "fa") {
      // Persian calendar with Persian digits
      return new Intl.DateTimeFormat("fa-IR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);
    }

    // Default: English
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  });


  return { locale, convertedDate };
}
