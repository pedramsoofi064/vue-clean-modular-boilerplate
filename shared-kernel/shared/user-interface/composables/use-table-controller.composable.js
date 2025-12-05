import uuid from "@cross-cutting/libs/uuid.lib";
import sessionStorage from "@business-logic/shared/services/session-storage.service";

const DEFAULT_INITIALS_VALUES = {
  page: 1,
  pageSize: 5,
};
const DEFAULT_MAP = (item) => item;
const DEFAULT_PAYLOAD = {};

const toNormalizeArgs = ({ persist = {}, initialValues = {}, map, payload }) => {
  const defaultPersist = { key: uuid.generate(), storage: sessionStorage };
  const normalizedPersist = { ...defaultPersist, ...persist };

  const normalizedInitialValues = { ...DEFAULT_INITIALS_VALUES, ...initialValues };

  const normalizedMap = map || DEFAULT_MAP;

  const normalizedPayload = payload || DEFAULT_PAYLOAD;

  return { normalizedPersist, normalizedInitialValues, normalizedMap, normalizedPayload };
};

export const useTableController = ({
  onBeforeGet,
  get,
  onAfterGet,
  map,
  items,
  totalItems,
  persist,
  initialValues,
  payload,
  filterType,
  immediate = true,
}) => {
  const { normalizedPersist, normalizedInitialValues, normalizedMap, normalizedPayload } = toNormalizeArgs({
    persist,
    initialValues,
    map,
    payload,
  });
  const filter = useFilter(filterType);

  const { key: storageKey, storage } = normalizedPersist;

  const pageSize = usePersistRef({
    storage,
    key: `${storageKey}:pageSize`,
    initialValue: normalizedInitialValues.pageSize,
    type: Number,
  });
  const page = usePersistRef({
    storage,
    key: `${storageKey}:page`,
    initialValue: normalizedInitialValues.page,
    type: Number,
  });

  const maxPage = computed(() => Math.ceil(toValue(totalItems) / pageSize.value));
  const mappedItems = computed(() => toValue(items).map(normalizedMap));

  const { loading, execute: executeGet } = usePromise(async (payload = {}) => {
    if (page.value > maxPage.value && maxPage.value) page.value = maxPage.value;

    await onBeforeGet?.();

    await get({
      page: page.value,
      pageSize: pageSize.value,
      ...toValue(normalizedPayload),
      ...payload,
      ...filter.value,
    });

    await onAfterGet?.();
  });

  watch(
    () => [page.value, pageSize.value, filter.value],
    () => executeGet(),
    {
      deep: true,
      immediate,
    },
  );

  return reactive({
    page,
    pageSize,
    maxPage,
    items: mappedItems,
    totalItems,
    executeGet,
    loading,
  });
};
