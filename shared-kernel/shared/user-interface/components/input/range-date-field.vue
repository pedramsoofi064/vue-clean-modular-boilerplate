<template>
  <div class="range-date-field">
    <div class="range-date-field__label" v-if="props.label || props.resettable">
      <span>{{ props.label }}</span>

      <base-button
        v-if="props.resettable"
        class="range-date-field__reset-button"
        variant="text"
        label="حذف"
        size="sm"
        @click="reset"
      />
    </div>

    <div class="range-date-field__fields">
      <date-field v-model="fromDate" v-bind="fromAttrs" />

      <date-field v-model="toDate" v-bind="toAttrs" />
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

  const fromDate = computed({
    get() {
      return props.modelValue[0] ?? null;
    },
    set(value) {
      emit("update:modelValue", [value, props.modelValue[1]]);
    },
  });
  const toDate = computed({
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
  .range-date-field {
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
