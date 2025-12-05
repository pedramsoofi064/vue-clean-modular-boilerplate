export const useClassModifier = (className, modifiers) =>
  computed(() =>
    Object.entries(toValue(modifiers)).reduce(
      (acc, [modifier, condition]) => ({
        ...acc,
        [`${className}--${modifier}`]: condition,
      }),
      { [className]: true },
    ),
  );
