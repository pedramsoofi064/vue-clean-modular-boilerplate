export const useCountDown = ({ duration = 10, startOnMount = true, onEnd = () => {} } = {}) => {
  const value = ref(duration);
  let intervalId = null;

  const stop = () => clearInterval(intervalId);

  const start = () => {
    intervalId = setInterval(() => {
      if (value.value <= 0) {
        stop();
        onEnd();

        return;
      }

      value.value--;
    }, 1000);
  };

  onScopeDispose(stop);

  onMounted(() => {
    if (startOnMount) start();
  });

  return {
    value,
    start,
    stop,
  };
};
