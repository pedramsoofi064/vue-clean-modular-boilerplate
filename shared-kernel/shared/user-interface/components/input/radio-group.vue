<template>
  <div :class="radioGroupClasses">
    <slot name="label" :label="props.label">
      <div class="radio-group__label" v-if="props.label">{{ props.label }}</div>
    </slot>

    <transition-group appear name="list" tag="div" class="radio-group__list" :style="props.listStyle">
      <template v-if="!props.card">
        <radio-button
          v-for="(option, index) in options"
          v-bind="option"
          :key="option.value"
          :model-value="isSelected(option)"
          :disabled="isDisabled(option)"
          class="radio-group__button"
          @update:model-value="selectOption(option)"
        >
          <template #label="{ label }">
            <slot name="option-label" v-bind="{ ...option, index }">{{ label }}</slot>
          </template>
        </radio-button>
      </template>

      <template v-else>
        <div
          v-for="(option, index) in options"
          :key="option.value"
          :class="{ 'radio-group__card': true, card: true, 'card--active': isSelected(option) }"
        >
          <radio-button
            v-bind="option"
            :model-value="isSelected(option)"
            :disabled="isDisabled(option)"
            class="radio-group__button"
            @update:model-value="selectOption(option)"
          >
            <template #label="{ label }">
              <slot name="option-label" v-bind="{ ...option, index }">{{ label }}</slot>
            </template>
          </radio-button>

          <slot
            :name="`card-${toKebabCase(option.value.toLowerCase().replace('_', '-'))}`"
            v-bind="{ isActive: isSelected(option), isDisabled: isDisabled(option), ...option }"
          />
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script setup>
  import { toKebabCase } from "@cross-cutting/utils/string.util.js";

  const props = defineProps({
    modelValue: {
      type: Object,
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
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].includes(value);
      },
    },
    takeValueAtStart: {
      type: Boolean,
      default: true,
    },
    label: String,
    disabled: Boolean,
    grid: Boolean,
    listStyle: {
      type: Object,
      default: () => ({}),
    },
    card: Boolean,
    bordered: Boolean,
  });

  const emit = defineEmits(["update:modelValue"]);

  const selectedOption = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  const isSelected = (option) => selectedOption.value.value === option.value;
  const isDisabled = ({ isDisabled }) => isDisabled || props.disabled;
  const selectOption = (option) => {
    if (option.isDisabled) return;

    selectedOption.value = option;
  };

  const radioGroupClasses = useClassModifier(
    "radio-group",
    computed(() => ({
      [props.direction]: true,
      grid: props.grid,
      card: props.card,
      bordered: props.bordered,
    })),
  );

  onMounted(() => {
    if ((!props.modelValue || !("value" in props.modelValue)) && props.takeValueAtStart)
      selectedOption.value = { ...props.options[0] };
  });
</script>

<style lang="scss" scoped>
  $root: ".radio-group";

  #{$root} {
    @include flex($dir: column);
    gap: space(2);

    &--grid {
      #{$root}__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &--bordered {
      padding: space(2);
      border-radius: radius(1);
      border: 1px solid var(--palette-outline-3);
    }

    &--card {
      #{$root}__list {
        @include flex($dir: column);

        gap: space(4);
      }

      #{$root}__card {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: space(4);

        width: 100%;
        padding: space(2);
        border-radius: radius(1.5);
        border: 1.5px solid transparent;

        background-color: var(--palette-bg-2);

        transition: all 0.3s ease-in;
      }

      .card--active {
        background-color: var(--palette-surface-info);
        border-color: var(--palette-blue-500);
      }
    }

    &__list {
      @include flex($justify: space-between);
      gap: space(4);
      width: 100%;
    }

    &--vertical {
      #{$root}__list {
        flex-direction: column;
      }
    }

    &__label {
      @include typography(regular-14);
      color: var(--palette-text-main-3);
    }

    &__button {
      min-width: 132px;
    }
  }

  .option {
    padding: space(2.5);
    border-radius: radius(1);

    background-color: var(--palette-bg-1);
    border: 1px solid var(--palette-outline-2);

    transition: all 0.3s ease-in-out;

    &--active {
      border-color: var(--palette-blue-400);
      background-color: var(--palette-surface-info);
    }

    &--disabled {
      background-color: var(--palette-bg-2);

      cursor: not-allowed;
    }
  }
</style>
