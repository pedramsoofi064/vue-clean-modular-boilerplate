export const useSearch = (items, key = "name") => {
  const searchedValue = ref("");

  const searchedItems = computed(
    () =>
      (toValue(items) || []).filter((item) =>
        (String(getValueByPath(item, key)) || "").includes(searchedValue.value),
      ) || [],
  );

  return { items: searchedItems, searchedValue };
};
