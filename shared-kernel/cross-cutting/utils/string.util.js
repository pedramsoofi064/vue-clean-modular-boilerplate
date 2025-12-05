export const toKebabCase = (key = "") => {
  const result = key.replace(/([A-Z])/g, " $1").trim();

  return result.split(" ").join("-").toLowerCase();
};

export const isString = (value) =>
  typeof value === "string" ||
  value instanceof String ||
  Object.prototype.toString.call(value) === "[object String]";

export const formatCardNumber = (cardNumber) => cardNumber.match(/.{4}/g).reverse().join(" - ");

export const formatShebaNumber = (shebaNumber) => `IR - ${shebaNumber}`;

export const convertNumberToLocalString = (number) => {
  const castedNumber = Number(number);

  return castedNumber || castedNumber === 0 ? castedNumber.toLocaleString() : "";
};

export const formatPrice = (number, unit = "ریال") => `${convertNumberToLocalString(number)} ${unit}`;

export const formatPercentage = (percentage) => (percentage || percentage === 0 ? `${percentage} درصد` : "");

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const PERSIAN_ORDINAL_NUMBER = ["صفرم", "اول", "دوم", "سوم"];
export const toPersianOrdinalNumber = (number) => PERSIAN_ORDINAL_NUMBER[number];
