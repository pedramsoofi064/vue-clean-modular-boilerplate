<template>
  <div :class="textFieldClasses">
    <label class="text-field__label" v-if="props.label || props.resettable" :for="`#${props.name}`">
      <slot name="label">{{ props.label }}</slot>

      <base-button
        class="text-field__reset-button"
        v-if="props.resettable"
        variant="text"
        label="حذف"
        size="sm"
        @click.prevent.stop="reset"
      />
    </label>

    <div class="text-field__body" ref="bodyElement">
      <div class="text-field__prefix" v-if="prefix">{{ props.prefix }}</div>

      <div class="text-field__content">
        <div v-if="props.prependIcon || $slots['prepend-icon']">
          <slot name="prepend-icon">
            <svg-loader
              class="text-field__icon"
              :name="props.prependIcon"
              @click="emitIconClicked('prepend')"
            />
          </slot>
        </div>

        <div class="text-field__input-wrapper">
          <slot>
            <component
              v-mask="props.mask"
              :is="fieldComponent"
              :type="props.type"
              :placeholder="props.placeholder"
              :id="props.name"
              :disabled="props.disabled"
              :autocomplete
              :rows="props.rows"
              :value="fieldValue"
              @accept="setFieldValue"
              class="text-field__input"
            />
          </slot>
        </div>

        <div v-if="props.appendIcon || $slots['append-icon']">
          <slot name="append-icon">
            <svg-loader
              class="text-field__icon"
              :name="props.appendIcon"
              @click="emitIconClicked('append')"
            />
          </slot>
        </div>
      </div>

      <div class="text-field__suffix" v-if="suffix">{{ props.suffix }}</div>
    </div>

    <div class="text-field__message" v-if="message">
      <slot name="message">
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    type: {
      type: String,
      default: "text",
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
    modelValue: {
      type: [Number, String, null],
      required: true,
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg"].includes(value),
    },
    block: {
      type: Boolean,
      default: true,
    },
    autocomplete: {
      type: Boolean,
      default: true,
    },
    rows: {
      type: Number,
      default: 4,
    },
    placeholder: String,
    rules: [String, Object],
    suffix: String,
    prefix: String,
    disabled: Boolean,
    hint: String,
    prependIcon: String,
    appendIcon: String,
    focused: Boolean,
    textarea: Boolean,
    resizable: Boolean,
    standalone: Boolean,
    mask: {
      type: Object,
      default: (props) => ({
        mask: props.type === "number" ? Number : String,
      }),
    },
    unmask: {
      type: Boolean,
      default: true,
    },
    resettable: Boolean,
  });

  const emit = defineEmits(["update:modelValue", "click:append", "click:prepend", "reset"]);

  const fieldComponent = computed(() => (props.textarea ? "textarea" : "input"));

  const fieldOptions = {
    initialValue: props.modelValue,
    label: props.validationLabel,
    standalone: props.standalone,
    syncVModel: true,
  };
  const { value: fieldValue, errorMessage } = useField(
    props.name,
    computed(() => (props.disabled ? {} : props.rules)),
    fieldOptions,
  );

  const reset = () => {
    fieldValue.value = "";

    emit("reset");
  };

  const setFieldValue = (event) => {
    const value = props.unmask ? event.detail.unmaskedValue : event.detail.value;

    const isNumberType = props.type === "number" || props.mask.mask === Number;

    fieldValue.value = isNumberType ? +value : value;
  };

  const textFieldClasses = useClassModifier(
    "text-field",
    computed(() => ({
      disabled: props.disabled,
      [props.size]: props.size,
      block: props.block,
      "has-error-message": errorMessage.value,
      focused: props.focused,
      textarea: props.textarea,
      resizable: props.resizable,
    })),
  );

  const message = computed(() => errorMessage.value || props.hint || "");

  const emitIconClicked = (iconSide) => {
    if (props.disabled) return;

    emit(`click:${iconSide}`);
  };

  const autocomplete = computed(() => (props.autocomplete ? "on" : "off"));

  const bodyElement = ref(null);
  defineExpose({
    bodyElement,
  });
</script>

<style lang="scss" scoped>
  $root: ".text-field";

  #{$root} {
    @include typography(regular-14);
    @include flex($dir: column, $justify: unset);

    gap: space(0.5);

    color: var(--palette-text-main-1);

    &--focused &__content,
    &__content:focus,
    &__content:focus-within {
      border: 1px solid var(--palette-primary);
      outline: 4px solid var(--palette-primary-light);
    }

    &--block {
      width: 100%;
    }

    &--disabled {
      cursor: not-allowed;

      #{$root}__content {
        background-color: var(--palette-bg-3);
        border-radius: 0;
      }
    }

    &:not(&--resizable) #{$root}__input {
      resize: none;
    }

    &__body {
      @include flex($justify: space-between, $align: center);

      width: 100%;
      border: 1px solid var(--palette-outline-3);
      border-radius: radius(1);
    }

    &--md {
      #{$root}__content {
        height: 40px;
      }
    }
    &--sm {
      #{$root}__content {
        height: 32px;
      }
    }
    &--lg {
      #{$root}__content {
        height: 48px;
      }
    }
    &--textarea {
      #{$root}__content {
        height: 100%;
      }
    }

    &__content,
    &__suffix,
    &__prefix {
      padding: space(2) space(3);
    }

    &__suffix,
    &__prefix {
      background-color: var(--palette-bg-3);
      color: var(--palette-text-main-3);

      flex-shrink: 0;
    }

    &__suffix {
      border-right: 1px solid var(--palette-outline-3);
      border-radius: radius(1) 0 0 radius(1);
    }

    &__prefix {
      border-left: 1px solid var(--palette-outline-3);
      border-radius: 0 radius(1) radius(1) 0;
    }

    &__content {
      @include flex($align: center);
      gap: space(2);

      width: 100%;
      border-radius: inherit;

      background-color: var(--palette-bg-1);

      z-index: $outline;

      transition: all 0.1s;
    }

    &__input-wrapper {
      @include hide-scrollbar;
      overflow: auto;

      width: 100%;
    }

    &__input {
      @include scrollbar;

      width: 100%;

      &::placeholder,
      &::-ms-input-placeholder {
        color: var(--palette-text-main-4);
        opacity: 1;
      }
    }

    &--has-error-message {
      #{$root}__content {
        border: 1px solid var(--palette-status-danger);
        outline: 4px solid var(--palette-surface-danger);
      }

      #{$root}__message {
        color: var(--palette-status-danger);
      }
    }

    &__message {
      @include typography(regular-12);
    }

    &__label,
    &__message {
      color: var(--palette-text-main-3);
    }

    &__label {
      @include flex($align: center, $justify: space-between);

      width: 100%;
    }

    &__reset-button {
      width: min-content;
      height: min-content;
      margin-right: auto;
    }

    &__icon {
      color: inherit;
      cursor: pointer;
    }
  }
</style>
