export const useDebouncedComputed = (getter, delay = 500) => {
  const debouncedValue = ref(getter());
  let timeout;

  watch(
    getter,
    (newValue) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        debouncedValue.value = newValue;
      }, delay);
    },
    { immediate: true },
  );

  return debouncedValue;
};
