<template>
  <transition-group
    appear
    tag="ul"
    class="toast-stack"
    v-for="stack in toastStacks"
    :key="stack.name"
    :class="stack.classList"
    :name="stack.transition"
  >
    <li
      v-for="toast in stack.toastList"
      :key="toast.id"
      @mouseenter="pauseTimer(toast)"
      @mouseleave="resumeTimer(toast)"
      class="toast-stack__item"
    >
      <slot v-bind="toast">
        <toast-notification v-bind="toast.props" @action:dismiss="dismiss(toast)" />
      </slot>
    </li>
  </transition-group>
</template>

<script setup>
  import { stacks } from "@cross-cutting/libs/toast.lib.js";

  import ToastNotification from "./toast-notification.vue";

  const toastManager = useToast();

  const pauseTimer = (toast) => {
    if (!toast || !toast.autoDismiss) return;

    toastManager.pauseTimer(toast.id);
  };

  const resumeTimer = (toast) => {
    if (!toast || !toast.autoDismiss) return;

    toastManager.resumeTimer(toast.id);
  };

  const dismiss = (toast) => {
    if (!toast) return;

    toastManager.dismiss(toast);
  };

  const toastStacks = computed(() =>
    Object.keys(stacks).map((position) => {
      const classList = position.split("-");
      const transitionName = `slide-${classList.includes("left") ? "left" : "right"}`;

      return {
        name: position,
        classList,
        transition: transitionName,
        toastList: stacks[position],
      };
    }),
  );
</script>

<style lang="scss" scoped>
  .toast-stack {
    position: fixed;
    z-index: $toast;

    &__item {
      margin: space(2) 0 0;
    }
  }

  .top {
    top: space(16);
  }

  .bottom {
    bottom: space(16);
  }

  .left {
    left: space(16);
  }

  .right {
    right: space(16);
  }

  .center {
    left: 50%;
    transform: translate(-50%);
  }

  .slide-left,
  .slide-right {
    &-enter-active {
      transition: all 0.3s ease-out;
    }

    &-leave-active {
      transition: all 0.8s ease-in;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }

  .slide-right {
    &-enter-from,
    &-leave-to {
      transform: translateX(100%);
    }
  }

  .slide-left {
    &-enter-from,
    &-leave-to {
      transform: translateX(-100%);
    }
  }
</style>
