<template>
  <button :class="buttonClasses" :disabled="props.disabled" :type="props.type">
    <div class="button__content" v-if="showContent">
      <div>
        <svg-loader
          :name="prependIcon"
          :style="{ transform: `rotate(${props.rotateIcon})` }"
          v-if="prependIcon"
          class="button__icon"
        />
      </div>

      <div>
        <slot :label="label">{{ label }}</slot>
      </div>

      <div>
        <svg-loader
          :name="appendIcon"
          :style="{ transform: `rotate(${props.rotateIcon})` }"
          v-if="appendIcon"
          class="button__icon"
        />
      </div>
    </div>

    <span class="button__loading" v-else-if="loading" />

    <div v-else-if="isIconVariant">
      <svg-loader
        :name="props.prependIcon || props.appendIcon"
        class="button__icon"
        :style="{ transform: `rotate(${props.rotateIcon})` }"
      />
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "filled",
    validator: (value) =>
      ["filled", "outlined", "text", "tonal", "icon"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg", "xlg"].includes(value),
  },
  block: {
    type: Boolean,
    default: true,
  },
  rotateIcon: {
    type: String,
    default: "0deg",
  },
  color: {
    type: String,
    default: "teal",
    validator(value) {
      return ["red", "teal"].includes(value);
    },
  },
  type: {
    type: String,
    default: "button",
    validator(value) {
      return ["button", "submit"].includes(value);
    },
  },
  label: String,
  disabled: Boolean,
  loading: Boolean,
  prependIcon: String,
  appendIcon: String,
  badge: Boolean,
});

const buttonClasses = useClassModifier(
  "button",
  computed(() => ({
    block: props.block,
    [props.variant]: props.variant,
    [props.size]: props.size,
    "has-badge": props.badge,
    [props.color]: props.color,
  }))
);

const isIconVariant = computed(() => props.variant === "icon");

const showContent = computed(() => !props.loading && !isIconVariant.value);
</script>

<style lang="scss" scoped>
$color-list: ("red", "teal");

.button {
  @include typography(bold-16);
  @include flex($align: center, $justify: center);
  transition: all 0.3s ease-out;

  border-radius: radius(1);
  cursor: pointer;

  &--block {
    width: 100%;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 40%;
  }

  @each $color in $color-list {
    &--#{$color} {
      --bg-color: var(--palette-#{$color}-500);
      --light-bg-color: var(--palette-#{$color}-100);
      --hover-bg-color: var(--palette-#{$color}-500);
      --active-light-bg-color: var(--palette-#{$color}-200);
      --active-bg-color: var(--palette-#{$color}-600);
      --text-color: var(--palette-#{$color}-400);
    }
  }

  &--teal {
    --bg-color: var(--palette-teal-500);
  }

  &--danger {
    --bg-color: var(--palette-red-500);
    --light-bg-color: var(--palette-red-400);
  }

  &--filled {
    background-color: var(--bg-color);
    color: var(--palette-text-light);

    &:hover:not(:disabled) {
      background-color: var(--hover-bg-color);
    }

    &:active:not(:disabled) {
      background-color: var(--active-bg-color);
    }

    &:disabled {
      background-color: var(--palette-bg-3);
      color: var(--palette-text-main-2);
    }
  }

  &--outlined,
  &--text,
  &--icon {
    &:hover:not(:disabled) {
      background-color: var(--palette-bg-2);
    }

    &:active:not(:disabled) {
      background-color: var(--palette-bg-3);
    }

    &:disabled {
      color: var(--palette-text-main-3);
    }
  }

  &--text,
  &--outlined,
  &--tonal {
    color: var(--text-color);
  }

  &--outlined,
  &--icon {
    background-color: var(--palette-bg-light);

    border: 1px solid var(--palette-outline-3);

    &:hover,
    &:active,
    &:disabled {
      border-color: var(--palette-outline-4);
    }
  }

  &--tonal {
    background-color: var(--light-bg-color);

    &:hover:not(:disabled) {
      color: var(--hover-bg-color);
    }

    &:active:not(:disabled) {
      color: var(--text-color);
      background-color: var(--active-light-bg-color);
    }

    &:disabled {
      color: var(--palette-text-main-3);
      background-color: var(--palette-bg-3);
    }
  }

  &--sm,
  &--md {
    @include typography(bold-14);
  }
  &--sm {
    height: 32px;
    padding: 0 space(4);
  }
  &--md {
    height: 40px;
  }
  &--lg {
    height: 48px;
  }
  &--xlg {
    height: 56px;
  }
  &--md,
  &--lg,
  &--xlg {
    padding: 0 space(6);
  }

  &--icon {
    padding: 0;

    height: 40px;
    width: 40px;

    .button__icon {
      color: var(--palette-primary);
      width: 24px;
      height: 24px;
    }
  }

  &--has-badge {
    .button__icon {
      position: relative;
      &::after {
        content: "";

        position: absolute;
        top: 0;
        right: 1px;

        width: 10px;
        height: 10px;
        border-radius: $border-radius-circle;

        background-color: var(--palette-orange-500);
        border: 1.5px solid var(--palette-bg-1);
      }
    }
  }

  &__content {
    @include flex($align: center, $justify: center);
    gap: space(2);
  }

  &__icon,
  &__loading {
    color: inherit;
  }

  &__icon {
    @include flex($align: center, $justify: center);
    width: 20px;
    height: 20px;

    transition: all 0.3s ease-in;
  }

  &__loading {
    @extend %spinner-loading;

    width: 32px;
    height: 32px;
  }
}
</style>
