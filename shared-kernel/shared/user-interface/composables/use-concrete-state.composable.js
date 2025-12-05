export const useConcreteState = (store, path) => {
  const navigationContext = computed(() => navigateObject(store, toValue(path)));

  return computed({
    get() {
      const [reference, key] = navigationContext.value;

      return reference[key];
    },
    set(value) {
      const [reference, key] = navigationContext.value;

      reference[key] = value;
    },
  });
};
