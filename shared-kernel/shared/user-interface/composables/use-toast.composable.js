import { hasInjectionContext, inject } from "vue";
import { INJECTION_KEY } from "@user-interface/shared/plugins/toast";
import { toast as toastManager } from "@cross-cutting/libs";

export const useToast = () => {
  if (!hasInjectionContext()) return toastManager;

  const toast = inject(INJECTION_KEY);
  return toast;
};
