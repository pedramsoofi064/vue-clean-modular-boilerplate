<template>
  <div :class="previewClasses">
    <div class="preview__item" v-for="item in props.items" :key="item.label" :style="props.rowStyle">
      <div class="preview__label" :style="props.labelStyle">
        <slot :name="`${toKebabCase(item.id) || 'item'}-label`" v-bind="item">
          <span>{{ item.label }}</span>
        </slot>
      </div>

      <div class="preview__value">
        <slot :name="`${toKebabCase(item.id) || 'item'}-value`" v-bind="item">
          <span>{{ item.value }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { toKebabCase } from "@cross-cutting/utils/string.util.js";

  const props = defineProps({
    items: {
      type: Array,
      required: true,
      validator(value) {
        return !value.some((item) => !("label" in item) || !("value" in item));
      },
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].includes(value);
      },
    },
    labelStyle: {
      type: Object,
      default: () => ({}),
    },
    rowStyle: {
      type: Object,
      default: () => ({}),
    },
  });

  const previewClasses = useClassModifier(
    "preview",
    computed(() => ({
      [props.direction]: props.direction,
    })),
  );
</script>

<style lang="scss" scoped>
  .preview {
    @include flex($dir: column);
    gap: space(1);

    &--vertical {
      .preview__item {
        flex-direction: column;
      }
    }

    &__item {
      @include flex();
    }

    &__label {
      @include typography(regular-14);
      color: var(--palette-text-main-3);
      flex-shrink: 0;

      width: 240px;
    }

    &__value {
      @include typography(medium-14);
      @include flex($align: center, $wrap: wrap);
      gap: space(1);

      color: var(--palette-text-main-1);
    }
  }
</style>
