import { computed, ref, watch } from "vue";

const BASE_Z_INDEX = 1000;

export const INJECTION_KEY = Symbol("scrim");

export default {
  name: "scrim",
  parallel: true,
  setup(app) {
    const onRemoveHandlers = ref({});
    const itemCount = computed(() => Object.keys(onRemoveHandlers.value).length);

    const addItem = (zIndex, onRemove) =>
      (onRemoveHandlers.value = { ...onRemoveHandlers.value, [zIndex]: onRemove });

    const removeItem = (zIndex) => {
      const onRemove = onRemoveHandlers.value[zIndex];

      if (!onRemove) return;

      onRemoveHandlers.value = Object.keys(onRemoveHandlers.value)
        .filter((key) => key != zIndex)
        .reduce((handlers, key) => ({ ...handlers, [key]: onRemoveHandlers.value[key] }), {});

      onRemove();
    };

    const onKeyUp = (event) => {
      const { key, keyCode } = event;
      const isEscapeKey = keyCode === 27 || key === "Escape" || key === "Esc";

      if (!isEscapeKey) return;

      const zIndex = getZIndex();

      removeItem(zIndex - 2);
    };

    const enableScrim = () => {
      window.addEventListener("keyup", onKeyUp);
      document.body.style.overflow = "hidden";
    };

    const disableScrim = () => {
      document.body.style.overflow = "hidden auto";
      window.removeEventListener("keyup", onKeyUp);
    };

    watch(
      itemCount,
      (newCount) => {
        if (newCount) {
          enableScrim();
          return;
        }

        disableScrim();
      },
      {
        immediate: true,
      },
    );

    const getZIndex = () => BASE_Z_INDEX + itemCount.value * 2;

    app.provide(INJECTION_KEY, { addItem, removeItem, getZIndex });
  },
};
