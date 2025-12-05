<template>
  <div class="range-time-field">
    <div class="range-time-field__label" v-if="props.label || props.resettable">
      <span>{{ props.label }}</span>

      <base-button
        v-if="props.resettable"
        class="range-time-field__reset-button"
        variant="text"
        label="حذف"
        size="sm"
        @click="reset"
      />
    </div>

    <div class="range-time-field__fields">
      <time-field v-model="fromTime" v-bind="fromAttrs" />

      <time-field v-model="toTime" v-bind="toAttrs" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: Array,
      required: true,
      default: () => [null, null],
    },
    label: String,
    validationLabel: {
      type: String,
      default: (props) => props.label,
    },
    name: {
      type: String,
      default: (props) => props.validationLabel || "فیلد",
    },
    resettable: Boolean,
  });

  const emit = defineEmits(["update:modelValue"]);

  const fromTime = computed({
    get() {
      return props.modelValue[0] ?? null;
    },
    set(value) {
      emit("update:modelValue", [value, props.modelValue[1]]);
    },
  });
  const toTime = computed({
    get() {
      return props.modelValue[1] ?? null;
    },
    set(value) {
      emit("update:modelValue", [props.modelValue[0], value]);
    },
  });

  const reset = () => emit("update:modelValue", [null, null]);

  const fromAttrs = {
    label: "از",
    name: `${props.name}From`,
  };
  const toAttrs = {
    label: "تا",
    name: `${props.name}To`,
  };
</script>

<style lang="scss" scoped>
  .range-time-field {
    @include flex($dir: column);
    gap: space(2);

    &__fields {
      @include flex();
      gap: space(4);
    }

    &__label {
      @include flex($align: center, $justify: space-between);
      @include typography(medium-14);

      width: 100%;
      color: var(--palette-text-main-1);
    }

    &__reset-button {
      width: min-content;
      height: min-content;
      margin-right: auto;
    }
  }
</style>
