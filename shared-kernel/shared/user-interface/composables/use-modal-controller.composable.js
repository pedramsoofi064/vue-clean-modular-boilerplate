import { localStorage } from "@business-logic/shared/services";

const getIsVisible = ({ syncModelValue, defaultValue, persistKey }) => {
  const instance = getCurrentInstance();

  if (syncModelValue)
    return computed({
      get() {
        return instance.props.modelValue;
      },
      set(value) {
        instance.emit("update:modelValue", value);
      },
    });

  if (persistKey)
    return usePersistRef({
      key: persistKey,
      initialValue: defaultValue,
      type: Boolean,
      storage: localStorage,
    });

  return ref(defaultValue);
};

export const useModalController = ({
  syncModelValue = false,
  onBeforeOpen,
  onAfterOpen,
  onBeforeClose,
  onAfterClose,
  defaultValue = false,
  persistKey = false,
} = {}) => {
  const isVisible = getIsVisible({
    syncModelValue,
    defaultValue,
    persistKey,
  });

  const setVisibility = (value) => (isVisible.value = value);

  let payload = undefined;
  const open = (args) => {
    payload = args;

    setVisibility(true);
  };
  const close = (args) => {
    payload = args;

    setVisibility(false);
  };

  const toggle = (payload) => {
    if (isVisible.value) {
      close(payload);
      return;
    }

    open(payload);
  };

  watch(
    isVisible,
    (value) => {
      if (value) {
        onBeforeOpen?.(payload);
      } else {
        onBeforeClose?.(payload);
      }

      payload = undefined;
    },
    {
      flush: "sync",
    },
  );
  watch(isVisible, (value) => {
    if (value) {
      onAfterOpen?.(payload);
    } else {
      onAfterClose?.(payload);
    }

    payload = undefined;
  });

  return {
    open,
    close,
    toggle,
    isVisible,
    setVisibility,
  };
};
