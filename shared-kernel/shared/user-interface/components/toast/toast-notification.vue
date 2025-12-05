<template>
  <div :class="toastClasses">
    <svg-loader :name="iconName" class="toast__icon" />

    <span>{{ message }} </span>

    <svg-loader name="close" @click="$emit('action:dismiss')" class="toast__icon" />
  </div>
</template>

<script setup>
  defineEmits(["action:dismiss"]);

  const props = defineProps({
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "info",
      validator: (value) => ["danger", "info", "success", "warning", "neutral"].includes(value),
    },
    hasAction: Boolean,
  });

  const iconName = computed(() => (props.type === "neutral" ? "info" : props.type));

  const toastClasses = useClassModifier(
    "toast",
    computed(() => ({
      [props.type]: true,
      "has-action": props.hasAction,
    })),
  );
</script>

<style lang="scss" scoped>
  $root: ".toast";
  $color-list: ("success", "warning", "info", "danger");

  #{$root} {
    @include elevation(3);
    @include typography(bold-14);
    @include flex($align: center);

    gap: space(2);

    min-width: 356px;
    padding: space(4);
    border-radius: radius(1.5);

    background-color: var(--palette-gray-900);
    color: var(--palette-text-light);

    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    span::selection {
      background-color: var(--palette-bg-1);
      color: var(--palette-gray-900);
    }

    &__icon:last-child {
      cursor: pointer;
      margin-right: auto;
    }

    @each $color in $color-list {
      &--#{$color} {
        #{$root}__icon:first-child {
          color: var(--palette-status-#{$color});
        }
      }
    }

    &--neutral {
      #{$root}__icon:first-child {
        color: var(--palette-bg-2);
      }
    }
  }
</style>
