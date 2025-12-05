export const useDelayedComputed = ({ value, delay = 200, applyDelay = true }) => {
  const debouncedValue = ref(toValue(value));

  watch(value, () => {
    setTimeout(() => (debouncedValue.value = toValue(value)), toValue(applyDelay) ? delay : 0);
  });

  return debouncedValue;
};
