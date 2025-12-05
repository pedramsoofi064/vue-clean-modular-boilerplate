<template>
  <div class="month-picker">
    <div
      v-for="(month, index) in MONTH_LIST"
      :key="month"
      @click="setDate(index)"
      :class="{ 'month-picker__month': true, month: true, 'month--active': isActive(index) }"
      >{{ month }}</div
    >
  </div>
</template>

<script setup>
  import { default as moment, DATE_FORMAT } from "@cross-cutting/libs/moment.lib.js";

  const props = defineProps({
    modelValue: {
      type: [String, null],
      required: true,
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  const setDate = (monthIndex) =>
    emit("update:modelValue", moment(props.modelValue, DATE_FORMAT).jMonth(monthIndex).format(DATE_FORMAT));

  const isActive = (monthIndex) => moment(props.modelValue, DATE_FORMAT).format("jM") == monthIndex + 1;

  const MONTH_LIST = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
</script>

<style lang="scss" scoped>
  .month-picker {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: space(3);

    user-select: none;
  }

  .month {
    @include typography(regular-12);
    @include flex($align: center, $justify: center);

    width: 84px;
    height: 71px;
    border: 1px solid var(--palette-outline-3);
    border-radius: radius(1.25);

    color: var(--palette-text-main-2);

    transition: all 0.3s ease-in;
    cursor: pointer;

    &--active {
      background-color: var(--palette-primary);
      color: var(--palette-text-light);
    }

    &:hover {
      background-color: var(--palette-bg-3);
    }

    &:active {
      background-color: var(--palette-bg-4);
    }
  }
</style>
