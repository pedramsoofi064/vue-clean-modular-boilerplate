export const useRadioGroupVModel = (optionValue) =>
  computed({
    get() {
      const rawValue = toValue(optionValue);

      const hasValue = rawValue || rawValue === false;
      return hasValue ? { value: rawValue } : {};
    },
    set(value) {
      optionValue.value = value?.value;
    },
  });
