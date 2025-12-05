export const useScrollTable = (tableController) => {
  const bodyElement = ref(null);
  const windowDimensions = useWindowDimensions();

  useInfiniteScroll(bodyElement, () => {
    const isOutOfBound = tableController.pageSize >= tableController.maxPage;

    if (windowDimensions.isXLarge || isOutOfBound) return;

    tableController.pageSize = tableController.pageSize * 2;
  });

  watch(
    () => windowDimensions.isXLarge,
    (isXLarge) => {
      if (!isXLarge) tableController.pageSize = 20;
      else tableController.pageSize = tableController.pageSize > 100 ? 100 : tableController.pageSize;
    },
    {
      immediate: true,
    },
  );

  return { bodyElement };
};
