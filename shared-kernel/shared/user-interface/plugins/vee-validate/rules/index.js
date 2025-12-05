import { email } from "@vee-validate/rules";

const OTP = (value, [length = 4]) => {
  let OTPCode = value.trim();

  OTPCode = OTPCode.replace(/ /g, "");
  const isValidOTP = OTPCode.length == length;

  return isValidOTP;
};

const mobileNumber = (value) => {
  try {
    if (!value) {
      return true;
    }

    if (String(value).match(/^(09)[0-9]{9}$|^(۰۹)[۰۱۲۳۴۵۶۷۸۹]{9}$|^(٠٩)[٩٨٧٦٥٤٣٢١٠]{9}$/)) return true;
    else return "شماره موبایل معتبر نمی باشد";
  } catch (e) {
    return "شماره موبایل معتبر نمی باشد";
  }
};

const phoneNumber = (value) => {
  if (!value) return true;

  return String(value).match("^0\\d{10}$") ? true : "شماره تلفن ثابت معتبر نمی باشد";
};

const persianAlphabet = (value) => {
  if (value.match(/^[\u0600-\u06FF\s]+$/)) return true;
  else return "فقط استفاده از حروف فارسی مجاز است";
};

const englishAlphabet = (value) => {
  if (value.match(/^[A-Za-z0-9\s.,'?!/`~!@#$%^&*()-_+=;:<>"{}[\]|\\]+$/u)) return true;
  else return "فقط استفاده از حروف انگلیسی مجاز است";
};

const nonEnglishChars = (value) => {
  if (!value.match(/[A-Za-z]+/)) return true;
  else return " استفاده از حروف انگلیسی مجاز نیست";
};

const nationalCode = (value) => {
  try {
    if (!value) {
      return true;
    }
    let meliCode = String(value);
    if (meliCode.length === 10) {
      if (
        meliCode === "0000000000" ||
        meliCode === "1111111111" ||
        meliCode === "2222222222" ||
        meliCode === "3333333333" ||
        meliCode === "4444444444" ||
        meliCode === "5555555555" ||
        meliCode === "6666666666" ||
        meliCode === "7777777777" ||
        meliCode === "8888888888" ||
        meliCode === "9999999999"
      ) {
        return false;
      }
      let c = parseInt(meliCode.charAt(9));
      let n =
        parseInt(meliCode.charAt(0)) * 10 +
        parseInt(meliCode.charAt(1)) * 9 +
        parseInt(meliCode.charAt(2)) * 8 +
        parseInt(meliCode.charAt(3)) * 7 +
        parseInt(meliCode.charAt(4)) * 6 +
        parseInt(meliCode.charAt(5)) * 5 +
        parseInt(meliCode.charAt(6)) * 4 +
        parseInt(meliCode.charAt(7)) * 3 +
        parseInt(meliCode.charAt(8)) * 2;
      let r = n - parseInt(n / 11) * 11;
      if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
        return true;
      }

      return "کد ملی معتیر نمی باشد";
    }
    return "کد ملی معتیر نمی باشد";
  } catch (e) {
    return "کد ملی معتیر نمی باشد";
  }
};

const persianDate = (value) => {
  const persianDateRegex =
    /^1[3-4][0-9][0-9]-((0?[1-6]-(3[0-1]|[1-2][0-9]|0?[1-9]))|((0?[7-9]|1[0-2])-(30|[1-2][0-9]|0?[1-9])))$/;

  if (!value.match(persianDateRegex)) return "تاریخ معتبر نمی باشد";

  return true;
};

const nationalCardSerial = (value) => {
  const nationalCardSerialRegex = /^[A-Za-z0-9]*$/;

  if (!String(value).match(nationalCardSerialRegex)) return "کد پشت کارت ملی هوشمند معتبر نمی باشد";

  return true;
};

const postalCode = (value) => {
  const POSTAL_CODE_REGEX = /^[1-9]\d{9}$/;

  if (!String(value).match(POSTAL_CODE_REGEX)) return "کد پستی معتبر نمی باشد";

  return true;
};

const exceptionMarks = (value, marks) => {
  for (const mark of marks) {
    if (value.includes(mark)) return `استفاده از علامت ${mark} غیرمجاز است`;
  }

  return true;
};

const USERNAME_REGEX = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
const username = (value) => USERNAME_REGEX.test(value) || "نام کاربری باید به صورت firstName.lastName باشد";

const mobileNumberOrEmail = (value) => {
  const isValidEmail = email(value) === true;
  const isValidMobileNumber = mobileNumber(value) === true;

  const isValid = isValidEmail || isValidMobileNumber;

  return isValid || "شماره موبایل یا ایمیل معتبر نمی باشد";
};

export default {
  OTP,
  persianAlphabet,
  mobileNumber,
  phoneNumber,
  nationalCode,
  persianDate,
  nationalCardSerial,
  englishAlphabet,
  postalCode,
  exceptionMarks,
  nonEnglishChars,
  username,
  mobileNumberOrEmail,
};
