import { configure, defineRule } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import fa from "@vee-validate/i18n/dist/locale/fa.json";
import * as AllRules from "@vee-validate/rules";
import customRules from "./rules";

const customFa = {
  code: "fa",
  messages: { ...fa.messages, min: "این فیلد باید حداقل 0:{length} کاراکتر باشد" },
};

export default {
  name: "vee-validate",
  parallel: true,
  setup() {
    Object.keys(AllRules).forEach((rule) => {
      defineRule(rule, AllRules[rule]);
    });

    Object.keys(customRules).forEach((rule) => {
      defineRule(rule, customRules[rule]);
    });

    configure({
      generateMessage: localize({
        fa: customFa,
      }),
      validateOnBlur: false,
      validateOnChange: false,
      validateOnInput: true,
    });

    setLocale("fa");
  },
};
