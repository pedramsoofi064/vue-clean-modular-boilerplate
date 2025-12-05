import moment from "moment-jalaali";
import fa from "moment/src/locale/fa";

moment.locale("fa", fa);
moment.loadPersian({ dialect: "persian-modern" });

export const DATE_FORMAT = "jYYYY-jMM-jDD";
export const ENGLISH_DATE_FORMAT = "YYYY-MM-DD";
export const DAY_FORMAT = "jDD";
export const ALPHABETIC_DATE_FORMAT = "jDD jMMMM jYYYY";
export const ALPHABETIC_WEEK_DAY_FORMAT = "dddd";
export const ALPHABETIC_DATE_FORMAT_WITHOUT_DAY = "jMMMM jYYYY";
export const ALPHABETIC_MONTH_FORMAT = "jMMMM";
export const TIME_FORMAT = "HH:mm:ss";
export const DATE_WITH_WEEK_DAY_FORMAT = `${ALPHABETIC_WEEK_DAY_FORMAT} ${DATE_FORMAT.split("-").toReversed().join("-")}`;
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const getWeekDay = (date = moment()) =>
  new Date(date).getDay() === 6 ? 0 : new Date(date).getDay() + 1;

export default moment;
