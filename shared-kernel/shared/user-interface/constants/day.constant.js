export const PERSIAN_WEEK_DAYS = ["شنبه", "یک‌شنبه", "دو‌شنبه", "سه‌شنبه", "چهار‌شنبه", "پنجشنبه", "جمعه"];
export const ENGLISH_WEEK_DAYS = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "THURSDAY",
  "WEDNESDAY",
  "FRIDAY",
];
export const WEEK_DAY_OPTIONS = PERSIAN_WEEK_DAYS.map((label, index) => ({
  label,
  value: ENGLISH_WEEK_DAYS[index],
}));
