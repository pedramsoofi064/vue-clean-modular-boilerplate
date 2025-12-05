<template>
  <div :class="checkboxClasses" @click="toggleChecked">
    <div class="checkbox__button">
      <transition name="checkbox__icon">
        <svg-loader name="check" class="checkbox__icon" v-if="props.modelValue" />
      </transition>
    </div>

    <span>{{ label }}</span>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    block: Boolean,
    label: String,
    disabled: Boolean,
  });

  const emit = defineEmits(["update:modelValue"]);

  const checkboxClasses = useClassModifier(
    "checkbox",
    computed(() => ({
      block: props.block,
      disabled: props.disabled,
      checked: props.modelValue,
    })),
  );

  const toggleChecked = () => {
    if (props.disabled) return;

    emit("update:modelValue", !props.modelValue);
  };
</script>

<style lang="scss" scoped>
  $root: ".checkbox";

  #{$root} {
    @include typography(regular-14);
    @include flex($align: center, $justify: center);
    gap: space(1);

    color: var(--palette-text-main-1);

    cursor: pointer;

    &__button {
      @include flex($align: center, $justify: center);

      width: 16px;
      height: 16px;
      margin: space(1);

      border-radius: radius(0.5);
      border: 1px solid var(--palette-gray-500);
      background-color: var(--palette-bg-1);
    }

    &--checked {
      #{$root}__button {
        background-color: var(--palette-blue-400);
      }

      #{$root}__icon {
        &-enter-active {
          animation: check-slide 0.4s forwards;
        }
      }
    }

    &--block {
      width: 100%;
    }

    &--disabled {
      color: var(--palette-text-main-4);

      &#{$root}--checked {
        #{$root}__icon {
          color: var(--palette-gray-500);
        }
      }

      #{$root}__button {
        background-color: var(--palette-bg-3);
      }
    }
  }

  @keyframes check-slide {
    0% {
      clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    }

    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
</style>
