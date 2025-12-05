import { useLocale } from "./useLocale";

export function useTranslateKey() {
  const { locale } = useLocale();

  const translateKey = (key) => {
    return `${key}${capitalize(locale.value)}`;
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return { locale, translateKey };
}
