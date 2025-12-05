import { reactive } from "vue";
import { Timeout } from "@cross-cutting/helpers";
import uuid from "@cross-cutting/libs/uuid.lib";

const DEFAULT_CONFIG = Object.freeze({
  duration: 3000,
  position: "top-left",
  type: "neutral",
  autoDismiss: true,
  stackMaxToast: 3,
});

const STACK_MAP = {
  top: [],
  bottom: [],
  "top-center": [],
  "top-left": [],
  "top-right": [],
  "bottom-center": [],
  "bottom-right": [],
  "bottom-left": [],
};

export const stacks = reactive(deepClone(STACK_MAP));
class ToastManager {
  #config;
  #toastsTimer = {};
  #reserveStacks = deepClone(STACK_MAP);
  setConfig(config) {
    this.#config = { ...DEFAULT_CONFIG, ...config };
  }

  constructor(config = {}) {
    this.setConfig(config);
  }

  #getToastConfig(toastConfig) {
    return { ...this.#config, ...toastConfig };
  }

  #checkReserveStack({ position }) {
    const reserveStack = this.#reserveStacks[position];
    const hasFreeSpace = stacks[position].length < this.#config.stackMaxToast;

    if (!hasFreeSpace || !reserveStack.length) return;

    const reservedToast = reserveStack.pop();
    this.show(reservedToast.props, reservedToast.toastConfig);
  }

  dismiss(toast) {
    const stack = stacks[toast.position];

    const toastIndex = stack.findIndex(({ id }) => toast.id === id);
    stack.splice(toastIndex, 1);

    this.#toastsTimer[toast.id]?.cancel();
    this.#checkReserveStack(toast);
  }

  pauseTimer(toastId) {
    this.#toastsTimer[toastId]?.pause();
  }

  resumeTimer(toastId) {
    this.#toastsTimer[toastId]?.resume();
  }

  show(props, toastConfig = {}) {
    const config = this.#getToastConfig(toastConfig);
    const { duration, position, autoDismiss } = config;

    const stackItemCount = stacks[position].length;
    if (stackItemCount >= this.#config.stackMaxToast) {
      this.#reserveStacks[position].unshift({ toastConfig, props });
      return;
    }

    if (!Object.keys(STACK_MAP).includes(position))
      throw new Error(`Unsupported toast position: ${position}`);

    const id = uuid.generate();

    if (autoDismiss) {
      const timeout = new Timeout(() => this.dismiss(toast), duration);
      this.#toastsTimer[id] = timeout;
    }

    const timer = this.#toastsTimer[id];

    const toast = {
      id,
      props,
      ...config,
      get remainingTime() {
        return timer?.remainingTime;
      },
    };

    const addStrategy = position.includes("top") ? "push" : "unshift";
    stacks[position][addStrategy](toast);

    return toast;
  }
}

export default new ToastManager();
