export const debounce = (func, duration = 1000) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), duration);
  };
};

export const throttle = (func, duration = 1000) => {
  let inThrottle;

  return (...args) => {
    if (!inThrottle) {
      func(...args);

      inThrottle = true;
      setTimeout(() => (inThrottle = false), duration);
    }
  };
};
