<template>
  <div :class="radioClasses" @click="toggleChecked">
    <span class="radio__circle" />

    <slot name="label" v-bind="{ label }">
      <span>{{ label }}</span>
    </slot>
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

  const radioClasses = useClassModifier(
    "radio",
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
  $root: ".radio";

  #{$root} {
    @include typography(regular-14);
    @include flex($align: center);
    gap: space(1);

    color: var(--palette-text-main-1);

    cursor: pointer;

    &__circle {
      width: 16px;
      height: 16px;
      margin: space(1);

      border-radius: $border-radius-circle;
      border: 1px solid var(--palette-gray-500);
      background-color: var(--palette-bg-1);

      transition: all 0.2s ease-in-out;
    }

    &--checked {
      #{$root}__circle {
        border: 5px solid var(--palette-blue-400);
      }
    }

    &--block {
      width: 100%;
    }

    &--disabled {
      color: var(--palette-text-main-4);

      cursor: not-allowed;

      &#{$root}--checked {
        #{$root}__circle {
          background-color: currentColor;
          border-color: var(--palette-bg-3);

          outline: 1px solid var(--palette-gray-500);
        }
      }

      #{$root}__circle {
        background-color: var(--palette-bg-3);
      }
    }
  }
</style>
