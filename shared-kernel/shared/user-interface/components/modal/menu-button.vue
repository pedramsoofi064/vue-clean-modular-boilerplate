<template>
  <base-button
    v-if="isButtonVariant"
    variant="icon"
    prepend-icon="menu"
    @click.prevent.stop="open"
    ref="buttonElement"
  />

  <svg-loader v-else name="menu" @click.prevent.stop="open" ref="buttonElement" class="menu-button__icon" />

  <base-menu
    :reference-element="buttonElement"
    :take-reference-width="false"
    :placement="props.placement"
    :actions="props.actions"
    :width="props.width"
    v-model="isVisible"
    @action="emitAction"
  />
</template>

<script setup>
  const props = defineProps({
    actions: {
      type: Array,
      validator(value) {
        return !value.some((action) => !("label" in action) || !("icon" in action));
      },
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    placement: { type: String, default: "bottom-end" },
    variant: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "icon"].includes(value);
      },
    },
    width: {
      type: String,
      default: "208px",
    },
  });

  const emit = defineEmits(["update:modelValue", "action"]);

  const isButtonVariant = computed(() => props.variant === "button");

  const buttonElement = ref(null);
  const { open, isVisible } = useModalController({ syncModelValue: true });

  const emitAction = (action) => emit("action", action);
</script>

<style lang="scss" scoped>
  .menu-button {
    &__icon {
      cursor: pointer;
    }
  }
</style>
