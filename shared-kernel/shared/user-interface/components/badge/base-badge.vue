<template>
  <div :class="badgeClasses">
    <slot>
      {{ props.label }}
    </slot>

    <div>
      <svg-loader
        :name="props.icon"
        v-if="props.icon"
        class="badge__icon"
        @click.stop="$emit('click:icon')"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "filled",
    validator(value) {
      return ["filled", "tonal"].includes(value);
    },
  },
  color: {
    type: String,
    default: "info",
    validator(value) {
      return [
        "primary",
        "info",
        "danger",
        "success",
        "warning",
        "neutral",
        "black",
      ].includes(value);
    },
  },
  icon: String,
  label: [String, Number],
  rounded: Boolean,
});

defineEmits(["click:icon"]);

const badgeClasses = useClassModifier(
  "badge",
  computed(() => ({
    rounded: props.rounded,
    [props.variant]: true,
    [props.color]: true,
    "has-icon": props.icon,
  }))
);
</script>

<style lang="scss" scoped>
$color-list: ("info", "danger", "success", "warning");
$root: ".badge";

#{$root} {
  @include typography(bold-12);
  @include flex($justify: space-between);

  color: var(--palette-text-light);

  padding: space(1) space(2);
  border-radius: radius(1);
  width: max-content;
  user-select: none;

  &--primary {
    &#{$root}--filled {
      background-color: var(--palette-primary);
    }

    &#{$root}--tonal {
      background-color: var(--palette-primary-light);
      color: var(--palette-primary-dark);
    }
  }

  &--neutral {
    &#{$root}--filled {
      background-color: var(--palette-bg-3);
      color: var(--palette-text-main-1);
    }

    &#{$root}--tonal {
      background-color: var(--palette-bg-2);
      color: var(--palette-text-main-2);
    }
  }

  &--warning {
    &#{$root}--filled {
      background-color: var(--palette-orange-400);
    }
  }

  &--black {
    &#{$root}--filled {
      background-color: var(--palette-gray-800);
    }

    &#{$root}--tonal {
      background-color: var(--palette-gray-300);
      color: var(--palette-gray-800);
    }
  }

  @each $color in $color-list {
    &--#{$color} {
      &#{$root}--filled {
        background-color: var(--palette-status-#{$color});
      }

      &#{$root}--tonal {
        background-color: var(--palette-surface-#{$color});
        color: var(--palette-text-#{$color});
      }
    }
  }

  &--rounded {
    border-radius: $border-radius-pill;
  }

  &--has-icon {
    min-width: 61px;
  }

  &__icon {
    width: 16px;
    height: 16px;

    cursor: pointer;
  }
}
</style>
