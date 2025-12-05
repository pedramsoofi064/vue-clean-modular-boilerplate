<template>
  <teleport to="#modal">
    <transition nam="fade-in">
      <div :class="modalClasses" v-if="props.modelValue" :style="{ zIndex: zIndex + 1 }">
        <header class="modal__header">
          <span>{{ props.title }}</span>

          <div class="modal__divider" v-if="$slots.action" />

          <slot name="action" />

          <svg-loader name="close" class="modal__close" @click="closeModal" />
        </header>

        <div class="modal__body" :style="props.bodyStyle">
          <div class="modal__content">
            <slot />
          </div>
        </div>

        <div class="modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </transition>

    <transition name="fade-in">
      <div class="overlay" v-if="props.modelValue" @click="closeModal" :style="{ zIndex }" />
    </transition>
  </teleport>
</template>

<script setup>
  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
      default: "sm",
      validator(value) {
        return ["sm", "md", "lg", "xlg"].includes(value);
      },
    },
    title: String,
    bodyStyle: {
      type: Object,
      default: () => ({}),
    },
    sheet: Boolean,
  });

  const emit = defineEmits(["update:modelValue"]);

  const isModalVisible = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  const closeModal = () => (isModalVisible.value = false);

  const { zIndex } = useScrim(isModalVisible);

  const modalClasses = useClassModifier(
    "modal",
    computed(() => ({
      [props.size]: true,
      sheet: props.sheet,
    })),
  );
</script>

<style lang="scss" scoped>
  .overlay {
    @include overlay();
  }

  .modal {
    @include elevation(4);

    background-color: var(--palette-bg-1);
    border-radius: radius(1.5);

    position: fixed;

    &:not(.modal--sheet) {
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);
    }

    &__header {
      @include typography(bold-16);
      @include flex($align: center);
      gap: space(3);

      width: 100%;

      color: var(--palette-text-main-2);
    }

    &__header,
    &__body {
      border-bottom: 1px solid var(--palette-outline-2);
    }

    &__header,
    &__body,
    &__footer {
      padding: space(4);
    }

    &__body {
      @include scrollbar();
      padding-left: 0;

      max-height: 480px;
    }

    &__content {
      width: 100%;
      border-radius: radius(1.5);
    }

    &__footer {
      @include flex();
      gap: space(2);
    }

    &__divider {
      width: 1px;
      background-color: var(--palette-bg-4);
      height: 40px;
    }

    &__close {
      width: 32px;
      height: 32px;
      padding: space(1.5);
      margin-right: auto;

      cursor: pointer;
    }

    &--sm {
      width: 500px;
    }

    &--md {
      width: 600px;
    }

    &--lg {
      width: 800px;

      .modal__body {
        min-height: 744px;
      }
    }

    &--xlg {
      width: 1140px;

      .modal__body {
        min-height: 744px;
      }
    }

    &--sheet {
      bottom: 0;
      left: 0;

      border-radius: radius(1.5) radius(1.5) 0 0;

      &,
      &__body {
        width: 100%;
      }
    }
  }
</style>
