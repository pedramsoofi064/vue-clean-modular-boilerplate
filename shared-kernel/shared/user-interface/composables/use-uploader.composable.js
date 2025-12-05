const DEFAULT_VALUES = {
  string: "",
  object: null,
};

const toStoredValue = (response, storeType = "object") => (storeType === "object" ? response : response.url);

const BUCKET_NAMES = {
  object: "docs",
  string: "images",
};

const toGetPayload = (storedValue, storeType) =>
  storeType === "object" ? storedValue : { url: storedValue };

export const useUploader = (storedValue, storeType = "object") => {
  const sharedStore = useSharedStore();

  const file = ref(null);

  let ignoreAdd = false;
  let ignoreGet = false;

  const resetFile = () => (file.value = null);

  const { execute: executeAdd, loading: addLoading } = usePromise(
    async () => {
      if (ignoreAdd) {
        ignoreAdd = false;
        return;
      }

      if (!file.value) {
        storedValue.value = DEFAULT_VALUES[storeType];
        return;
      }

      const response = await sharedStore.addFile({
        bucket: BUCKET_NAMES[storeType],
        file: file.value,
      });

      ignoreGet = true;
      storedValue.value = toStoredValue(response, storeType);
    },
    {
      onError: resetFile,
    },
  );
  const { execute: executeGet, loading: getLoading } = usePromise(async () => {
    if (ignoreGet) {
      ignoreGet = false;
      return;
    }

    const hasStoredValue = storeType === "object" ? storedValue.value?.url : storedValue.value;
    if (!hasStoredValue) {
      resetFile();
      return;
    }

    const uploadedFile = await sharedStore.getFile(toGetPayload(storedValue.value, storeType));

    ignoreAdd = true;
    file.value = uploadedFile;
  });

  watch(file, executeAdd);
  watch(storedValue, executeGet, {
    immediate: true,
  });

  return { file, loading: computed(() => addLoading.value || getLoading.value) };
};
