<template>
  <div :class="dividerClasses"> <div /> </div>
</template>

<script setup>
  const props = defineProps({
    direction: {
      type: String,
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].includes(value);
      },
    },
  });

  const dividerClasses = useClassModifier(
    "divider",
    computed(() => ({
      [props.direction]: true,
    })),
  );
</script>

<style lang="scss" scoped>
  .divider {
    padding: space(2.5);

    &--vertical {
      height: 100%;

      div {
        width: 1px;
      }
    }

    &--horizontal {
      width: 100%;

      div {
        height: 1px;
      }
    }

    div {
      background-color: var(--palette-outline-2);
    }
  }
</style>
