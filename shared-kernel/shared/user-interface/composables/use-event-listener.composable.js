export const useEventListener = ({ element = document, eventName, handler }) => {
  const cleanup = () => toValue(element)?.removeEventListener?.(eventName, handler);

  onScopeDispose(cleanup);

  let isEventListenerAdded = false;
  watch(
    () => toValue(element),
    () => {
      const rawElement = toValue(element);
      if (!rawElement || isEventListenerAdded) return;

      isEventListenerAdded = true;
      rawElement.addEventListener?.(eventName, handler);
    },
    {
      immediate: true,
    },
  );

  return cleanup;
};
