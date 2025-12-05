<template>
  <div class="radio-group">
    <slot name="label" :label="props.label">
      <div class="radio-group__label" v-if="props.label">{{ props.label }}</div>
    </slot>

    <div class="radio-group__list">
      <div
        :class="{
          'radio-group__option': true,
          option: true,
          'option--active': isSelected(option),
          'option--disabled': isDisabled(option),
        }"
        v-for="option in props.options"
        :key="option.value"
        @click="toggleOption(option)"
      >
        <radio-button
          :model-value="isSelected(option)"
          :disabled="isDisabled(option)"
          :label="option.label"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator(value) {
        return !value.some((option) => !("value" in option) || !("label" in option));
      },
    },
    label: String,
    disabled: Boolean,
    multiple: Boolean,
  });

  const emit = defineEmits(["update:modelValue"]);

  const selectedOptions = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  const isSelected = (option) => selectedOptions.value?.some?.(({ value }) => value === option.value);
  const isDisabled = ({ isDisabled }) => isDisabled || props.disabled;

  const selectOption = (option) => {
    if (props.multiple) {
      selectedOptions.value = [...selectedOptions.value, option];
      return;
    }

    selectedOptions.value = [option];
  };
  const removeOption = (option) => {
    selectedOptions.value = selectedOptions.value.filter(({ value }) => option.value !== value);
  };

  const toggleOption = (option) => {
    if (option.isDisabled) return;

    if (isSelected(option) && props.multiple) {
      removeOption(option);
      return;
    }

    selectOption(option);
  };
</script>

<style lang="scss" scoped>
  .radio-group {
    @include flex($dir: column);
    gap: space(2);

    &__list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: space(4);
    }

    &__label {
      @include typography(regular-14);
      color: var(--palette-text-main-3);
    }
  }

  .option {
    padding: space(2.5);
    border-radius: radius(1);

    @include mq(x-small) {
      padding: 3px;
    }

    background-color: transparent;
    border: 1px solid var(--palette-outline-2);

    transition: all 0.3s ease-in-out;

    &--active {
      border-color: var(--palette-primary);
      background-color: var(--palette-primary-light);
    }

    &--disabled {
      background-color: var(--palette-bg-2);

      cursor: not-allowed;
    }
  }
</style>
