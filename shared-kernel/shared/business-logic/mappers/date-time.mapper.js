import {
  default as moment,
  DATE_FORMAT,
  ENGLISH_DATE_FORMAT,
  DATE_TIME_FORMAT,
} from "@cross-cutting/libs/moment.lib.js";

export default class Mapper {
  static #toSanitizedDate(date) {
    return String(date).slice(0, 10);
  }

  static toDatePayload(date) {
    if (!date) return "";

    const sanitizedDate = Mapper.#toSanitizedDate(date);

    return moment(sanitizedDate, DATE_FORMAT).format(ENGLISH_DATE_FORMAT);
  }

  static toDateResponse(date) {
    if (!date) return "";

    const sanitizedDate = Mapper.#toSanitizedDate(date);

    return moment(sanitizedDate, ENGLISH_DATE_FORMAT).format(DATE_FORMAT);
  }

  static #toSanitizedTime(time, addSeconds = false) {
    return time.slice(0, addSeconds ? 8 : 5);
  }

  static toTimeResponse(time, addSeconds = false) {
    if (!time) return "";

    return Mapper.#toSanitizedTime(time, addSeconds);
  }

  static toDateTimePayload(dateTime) {
    const sanitizedDate = dateTime.length < DATE_TIME_FORMAT.length ? `${dateTime} 00:00:00` : dateTime;

    return moment(sanitizedDate, DATE_TIME_FORMAT).toISOString();
  }
}
