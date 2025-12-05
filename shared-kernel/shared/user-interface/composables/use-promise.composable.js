const DEFAULT_CONFIG = {
  throwOnError: false,
  defaultData: null,
  onError: () => {},
};

export const usePromise = (promise, { throwOnError, defaultData, onError } = DEFAULT_CONFIG) => {
  const loading = ref(false);
  const error = ref(null);
  const data = ref(defaultData);
  const isFetched = ref(false);

  const execute = async (...params) => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    try {
      data.value = await promise(...params);

      isFetched.value = true;

      return data.value;
    } catch (errorInfo) {
      console.error(errorInfo);
      error.value = errorInfo;

      onError?.(errorInfo);

      if (throwOnError) throw new Error(errorInfo);
    } finally {
      loading.value = false;
    }
  };

  return { data, error, isFetched, loading, execute };
};

export default usePromise;
