const addLeadingZero = (number, { zeroCount = 2 } = {}) => `${number}`.padStart(zeroCount, "0");

const TIME_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const DURATION_REGEX =
  /^((1?[0-9]|2[0-3])[h])$|^((([0]?|[1-5]{1})[0-9])[m])$|^(((1?[0-9]|2[0-3])[h])\s((([0]?|[1-5]{1})[0-9])[m]))$/;

class Time {
  static validate(time) {
    if (!time || typeof time !== "string") return false;

    return TIME_REGEX.test(time);
  }

  static validateDuration(duration) {
    if (!duration || typeof duration !== "string") return false;

    return DURATION_REGEX.test(duration);
  }

  static #addMinute(time, additionalMinutes) {
    if (additionalMinutes === 0) return time;

    const [hour, minute] = time.split(":");

    const sumOfMinutes = +minute + additionalMinutes;
    const result = sumOfMinutes > 59 ? sumOfMinutes - 60 : sumOfMinutes;

    const timeResult = `${hour}:${addLeadingZero(result)}`;

    return sumOfMinutes > 59 ? Time.#addHour(timeResult, 1) : timeResult;
  }

  static #addHour(time, additionalHours) {
    if (additionalHours === 0) return time;

    const [hour, minute] = time.split(":");

    const sumOfHours = +hour + additionalHours;
    const result = sumOfHours > 23 ? sumOfHours - 24 : sumOfHours;

    return `${addLeadingZero(result)}:${minute}`;
  }

  static add(time, addDuration) {
    if (!Time.validate(time) || !Time.validateDuration(addDuration)) return false;

    const durationAmounts = addDuration.split(" ");

    return durationAmounts.reduce((currentTime, amount) => {
      const [duration, unit] = amount.split(/(h|m)/, 2);

      if (unit === "m") return Time.#addMinute(currentTime, +duration);
      else if (unit === "h") return Time.#addHour(currentTime, +duration);
    }, time);
  }

  static compare(referenceTime, timeToCompare) {
    if (!Time.validate(referenceTime) || !Time.validate(timeToCompare))
      throw new Error("Time must be in `HH:MM` format");

    if (referenceTime === timeToCompare) return 0;

    const [referenceHour, referenceMinute] = referenceTime.split(":");
    const [timeToCompareHour, timeToCompareMinute] = timeToCompare.split(":");

    if (+timeToCompareHour < +referenceHour) return -1;
    if (+timeToCompareHour > +referenceHour) return 1;

    if (+timeToCompareMinute < +referenceMinute) return -1;
    if (+timeToCompareMinute > +referenceMinute) return 1;
  }

  static isOverlapping(referenceTime, timeToCheck) {
    const isStartOverlapping =
      Time.compare(referenceTime[0], timeToCheck[0]) === 1 &&
      Time.compare(referenceTime[1], timeToCheck[0]) === -1;

    const isEndOverlapping =
      Time.compare(referenceTime[0], timeToCheck[1]) === 1 &&
      Time.compare(referenceTime[1], timeToCheck[1]) === -1;

    return isStartOverlapping || isEndOverlapping;
  }

  static isBetween(referenceTime, timeToCheck) {
    const startCompareValue = Time.compare(referenceTime[0], timeToCheck[0]);
    const isAfterStart = startCompareValue === 1 || startCompareValue === 0;

    const endCompareValue = Time.compare(referenceTime[1], timeToCheck[1]);
    const isBeforeEnd = endCompareValue === -1 || endCompareValue === 0;

    return isAfterStart && isBeforeEnd;
  }

  static toMinutes(duration) {
    if (!Time.validateDuration(duration)) throw new Error("Invalid duration");

    const durationAmounts = duration.split(" ");

    return durationAmounts.reduce((durationInMinutes, amount) => {
      const [duration, unit] = amount.split(/(h|m)/, 2);

      if (unit === "m") return durationInMinutes + +duration;
      else if (unit === "h") return durationInMinutes + +duration * 60;
    }, 0);
  }

  static convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (!hours) return `${remainingMinutes}m`;
    if (!remainingMinutes) return `${hours}h`;

    return `${hours}h ${remainingMinutes}m`;
  }

  static difference(referenceTime, timeToCompare) {
    if (Time.compare(referenceTime, timeToCompare) < 0) return Time.difference(timeToCompare, referenceTime);

    if (referenceTime === timeToCompare) return "0m";

    const [referenceHour, referenceMinute] = referenceTime.split(":");
    const [timeToCompareHour, timeToCompareMinute] = timeToCompare.split(":");

    const minutesDifference = +timeToCompareMinute - +referenceMinute;
    const minute = minutesDifference < 0 ? 60 + minutesDifference : minutesDifference;

    const hourDifference = +timeToCompareHour - +referenceHour;
    let hour = hourDifference < 0 ? 60 + hourDifference : hourDifference;

    if (minutesDifference < 0) hour--;

    if (hour && minute) return `${hour}h ${minute}m`;
    if (hour) return `${hour}h`;

    return `${minute}m`;
  }

  static getCount(range, gapDuration) {
    const gapInMinutes = Time.toMinutes(gapDuration);

    const difference = Time.difference(...range);
    const timeDifferenceInMinutes = Time.toMinutes(difference);

    const gapCount = timeDifferenceInMinutes / gapInMinutes;
    return gapCount;
  }
}

export default Time;
