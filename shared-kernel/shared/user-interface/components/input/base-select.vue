<template>
  <div :class="selectClasses">
    <text-field
      v-bind="textFieldAttrs"
      ref="textFieldRef"
      :autocomplete="false"
      :focused="isDropdownVisible && !!filteredOptions.length"
      :standalone="props.standalone"
      :resettable="props.resettable"
      :model-value="selectedOptionLabel"
      @click="setDropdownVisibility(true)"
      @update:model-value="search"
      @reset="reset"
    >
      <template v-if="props.multiple">
        <div class="select__badge-list">
          <div v-for="option in fieldValue" :key="option.value">
            <base-badge
              :label="option.label || getLabelByValue(option.value)"
              color="neutral"
              icon="close"
              @click:icon="toggleOption(option)"
            />
          </div>
        </div>
      </template>
    </text-field>

    <floating-modal
      :reference-element="textFieldBodyElement"
      :has-overlay="false"
      :has-header="false"
      v-model="isDropdownVisible"
      v-if="filteredOptions.length"
    >
      <div class="select__option-list">
        <div
          :class="{
            select__option: true,
            option: true,
            'option--active': !props.multiple && isOptionSelected(option),
            'option--hovered': isOptionHovered(option),
          }"
          v-for="option in filteredOptions"
          :key="option.value"
          @click="toggleOption(option)"
          @pointerenter="setHoveredOption(option)"
        >
          <checkbox-button v-if="props.multiple" :modelValue="isOptionSelected(option)" />

          <slot
            name="label"
            v-bind="{
              ...option,
              isActive: !props.multiple && isOptionSelected(option),
              isHovered: isOptionHovered(option),
            }"
          >
            <span>
              {{ option.label }}
            </span>
          </slot>
        </div>
      </div>
    </floating-modal>
  </div>
</template>

<script setup>
  import { useSetFieldError } from "vee-validate";

  const props = defineProps({
    modelValue: {
      type: Array,
      required: true,
      validator: (value, props) =>
        !props.options.length ||
        value.every((selectedOption) =>
          props.options.some((option) => option.value === selectedOption.value),
        ),
    },
    options: {
      type: Array,
      required: true,
      validator: (options) => !options.some((option) => !("label" in option) || !("value" in option)),
    },
    name: {
      type: String,
      default: (props) => props.label || "فیلد",
    },
    validationLabel: {
      type: String,
      default: (props) => props.label,
    },
    block: {
      type: Boolean,
      default: true,
    },
    multiple: Boolean,
    unselectable: {
      type: Boolean,
      default: (props) => props.multiple,
    },
    rules: [Object, String],
    label: String,
    disabled: Boolean,
    standalone: Boolean,
    resettable: Boolean,
  });

  defineEmits(["update:modelValue"]);

  const searchedValue = ref("");
  const search = (value) => (searchedValue.value = value);
  const filteredOptions = computed(() =>
    props.options.filter((option) => option.label?.includes(searchedValue.value)),
  );

  const fieldOptions = reactive({
    initialValue: props.modelValue,
    label: props.validationLabel,
    syncVModel: true,
    standalone: props.standalone,
  });
  const { value: fieldValue, errorMessage } = useField(
    props.name,
    computed(() => (props.disabled ? {} : props.rules)),
    fieldOptions,
  );
  const reset = () => (fieldValue.value = []);

  const attributes = useAttrs();
  const textFieldAttrs = computed(() => ({
    ...attributes,
    appendIcon: "arrow-small",
    name: "field" + props.name,
    label: props.label,
    validationLabel: props.validationLabel,
    disabled: props.disabled,
    block: props.block,
  }));

  const isDropdownVisible = ref(false);
  const setDropdownVisibility = (value) => {
    if (props.disabled) return;

    isDropdownVisible.value = value;
  };

  const selectClasses = useClassModifier(
    "select",
    computed(() => ({
      block: props.block,
    })),
  );

  const hoveredOption = ref({});
  const setHoveredOption = (option) => (hoveredOption.value = option);

  const toNormalizedIndex = (index) => (index === -1 ? null : index);
  useEventListener({
    eventName: "keydown",
    handler({ code }) {
      const hoveredOptionIndex = filteredOptions.value.findIndex(
        ({ value }) => value === hoveredOption.value?.value,
      );
      const selectedOptionIndex = filteredOptions.value.findIndex(
        ({ value }) => value === fieldValue.value?.[0]?.value,
      );

      const index = toNormalizedIndex(hoveredOptionIndex) ?? toNormalizedIndex(selectedOptionIndex) ?? 0;

      const optionCount = filteredOptions.value.length;

      if (code === "ArrowDown") {
        const nextIndex = index === optionCount - 1 ? 0 : index + 1;

        setHoveredOption(filteredOptions.value[nextIndex]);
      }

      if (code === "ArrowUp") {
        const previousIndex = index === 0 ? optionCount - 1 : index - 1;

        setHoveredOption(filteredOptions.value[previousIndex]);
      }

      if (code === "Enter") toggleOption(hoveredOption.value);
    },
  });

  const isOptionSelected = ({ value }) => fieldValue.value.some((option) => option.value === value);
  const isOptionHovered = ({ value }) => hoveredOption.value?.value === value;

  const removeOption = ({ value }) =>
    (fieldValue.value = fieldValue.value.filter((option) => option.value !== value));

  const addOption = (option) => (fieldValue.value = [...fieldValue.value, option]);

  const addByMultiple = (option) => {
    if (props.multiple) {
      addOption(option);
      return;
    }

    if (fieldValue.value?.length) {
      const selectedOption = fieldValue.value?.[0];
      removeOption(selectedOption);
    }

    addOption(option);
  };

  const toggleOption = (option) => {
    const { isDisabled = false } = option;
    if (isDisabled) return;

    if (isOptionSelected(option) && props.unselectable) removeOption(option);
    else addByMultiple(option);

    if (!props.multiple) setDropdownVisibility(false);
  };

  const selectedOptionLabel = computed(() => {
    const label =
      fieldValue.value?.[0]?.label ||
      props.options.find((option) => option.value === fieldValue.value[0]?.value)?.label;

    return label || "";
  });

  const textFieldRef = ref(null);
  const textFieldBodyElement = computed(() => textFieldRef.value?.bodyElement);

  const setTextFieldError = props.rules && useSetFieldError(textFieldAttrs.value.name);
  watch(
    errorMessage,
    (value) => {
      if (!props.rules) return;

      setTextFieldError(value);
    },
    {
      immediate: true,
    },
  );

  const getLabelByValue = (value) => props.options.find((option) => option.value === value)?.label;
</script>

<style lang="scss" scoped>
  .select {
    user-select: none;

    &--block {
      width: 100%;
    }

    &__option-list {
      max-height: 300px;
    }

    &__badge-list {
      @include flex();
      gap: space(1);
    }
  }

  .option {
    @include flex();
    gap: space(2);

    padding: space(2) space(4);
    border-radius: radius(1);

    transition: all 0.2s;
    cursor: pointer;

    &--active {
      background-color: var(--palette-primary);
      color: var(--palette-text-light);
    }

    &--hovered {
      color: var(--palette-text-main-2);
      background-color: var(--palette-surface-info);
    }
  }
</style>
