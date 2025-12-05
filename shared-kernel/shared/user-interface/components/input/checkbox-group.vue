<template>
  <div :class="checkboxGroupClasses">
    <span class="checkbox-group__label" v-if="props.label">{{ props.label }}</span>

    <transition-group name="list" appear tag="div" class="checkbox-group__body">
      <div class="checkbox-group__option" v-for="option in props.options" :key="option.value">
        <checkbox-button
          @update:model-value="toggleOption(option)"
          :model-value="isOptionsSelected(option)"
          :disabled="props.disabled"
        />

        <slot v-bind="option" name="label">
          <span>{{ option.label }}</span>
        </slot>
      </div>
    </transition-group>
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
    direction: {
      type: String,
      default: "vertical",
      validator(value) {
        return ["vertical", "horizontal"].includes(value);
      },
    },
    label: String,
    grid: Boolean,
    block: Boolean,
    disabled: Boolean,
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
  const isOptionsSelected = ({ value }) => !!selectedOptions.value.find((option) => option.value === value);
  const addOption = (option) => (selectedOptions.value = [...selectedOptions.value, option]);
  const removeOption = ({ value }) =>
    (selectedOptions.value = selectedOptions.value.filter((option) => option.value !== value));

  const toggleOption = (option) => {
    if (isOptionsSelected(option)) {
      removeOption(option);
      return;
    }

    addOption(option);
  };

  const checkboxGroupClasses = useClassModifier(
    "checkbox-group",
    computed(() => ({
      grid: props.grid,
      block: props.block,
      [props.direction]: props.direction,
    })),
  );
</script>

<style lang="scss" scoped>
  .checkbox-group {
    @include flex($dir: column);
    gap: space(2);

    &--vertical {
      .checkbox-group__body {
        flex-direction: column;
      }
    }

    &--horizontal {
      .checkbox-group__body {
        justify-content: space-between;

        width: 100%;
        padding-left: space(2);
      }
    }

    &--grid {
      .checkbox-group__body {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &--block {
      &,
      .checkbox-group__body {
        width: 100%;
      }
    }

    &__label,
    &__option {
      @include typography(regular-14);
    }

    &__label {
      color: var(--palette-text-main-3);
    }

    &__body {
      @include flex();
      gap: space(2);
    }

    &__option {
      @include flex();
      gap: space(2);

      padding: space(1) 0;

      color: var(--palette-text-main-2);
    }
  }
</style>
