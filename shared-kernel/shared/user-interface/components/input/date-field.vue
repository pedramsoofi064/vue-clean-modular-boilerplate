<template>
  <div class="date-field">
    <text-field
      append-icon="calendar"
      ref="textFieldRef"
      v-model="date"
      @click:append="openDatePicker"
      v-bind="$attrs"
    />

    <floating-modal
      :reference-element="bodyElement"
      v-model="isDatePickerVisible"
      :take-reference-width="false"
      :has-overlay="false"
      title="تاریخ را انتخاب نمایید"
    >
      <date-picker v-model="date" @select="closeDatePicker" />
    </floating-modal>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: [String, null],
      required: true,
    },
  });
  const emit = defineEmits(["update:modelValue"]);

  const date = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  const textFieldRef = ref(null);

  const {
    isVisible: isDatePickerVisible,
    open: openDatePicker,
    close: closeDatePicker,
  } = useModalController();

  const bodyElement = computed(() => textFieldRef.value?.bodyElement);
</script>

<style lang="scss" scoped>
  .date-field {
    width: 100%;
  }
</style>
