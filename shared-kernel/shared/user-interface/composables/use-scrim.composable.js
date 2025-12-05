import { inject, watch } from "vue";
import { INJECTION_KEY } from "@user-interface/shared/plugins/scrim";

export const useScrim = (isVisible) => {
  const { addItem, removeItem, getZIndex } = inject(INJECTION_KEY);

  const zIndex = getZIndex();

  watch(isVisible, (newValue) => {
    if (newValue) {
      addItem(zIndex, () => {
        isVisible.value = false;
      });
    } else {
      removeItem(zIndex);
    }
  });

  return { zIndex };
};
