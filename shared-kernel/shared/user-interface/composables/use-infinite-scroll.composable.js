const DEFAULT_INTERVAL = 60 * 1000;
const DEFAULT_DISTANCE = 10;

export const useInfiniteScroll = (
  element,
  onLoad,
  { distance = DEFAULT_DISTANCE, interval = DEFAULT_INTERVAL } = {},
) => {
  const throttledOnLoad = throttle(onLoad);

  let lastScrollTop = 0;

  useEventListener({
    element,
    eventName: "scroll",
    handler: () => {
      const rawElement = toValue(element);

      if (rawElement.scrollTop < lastScrollTop) return;

      lastScrollTop = rawElement.scrollTop <= 0 ? 0 : rawElement.scrollTop;

      const isEndReached =
        rawElement.scrollTop + rawElement.offsetHeight + distance >= rawElement.scrollHeight;

      if (isEndReached) throttledOnLoad();
    },
  });

  const intervalId = setInterval(throttledOnLoad, interval);
  onScopeDispose(() => clearInterval(intervalId));
};
