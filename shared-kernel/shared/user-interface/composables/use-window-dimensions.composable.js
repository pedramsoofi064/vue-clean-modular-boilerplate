import { BREAKPOINTS } from "@user-interface/shared/constants";

export const useWindowDimensions = () => {
  const dimensions = reactive({
    width: window.innerWidth,
    height: window.innerHeight,
    BREAKPOINTS,
    isLarge: computed(() => dimensions.width >= BREAKPOINTS.large),
    isXLarge: computed(() => dimensions.width >= BREAKPOINTS.xLarge),
  });

  const updateDominations = () => {
    dimensions.width = window.innerWidth;
    dimensions.height = window.innerHeight;
  };

  onMounted(() => window.addEventListener("resize", updateDominations));

  onUnmounted(() => window.removeEventListener("resize", updateDominations));

  return dimensions;
};
