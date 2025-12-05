<template>
  <div class="day-picker">
    <div class="day-picker__action">
      <svg-loader name="arrow-right" class="day-picker__icon" @click="goToPreviousMonth" />

      <p class="day-picker__date" @click="emitSceneClicked">
        {{ formattedDate }}

        <svg-loader name="arrow-small-filled" />
      </p>

      <svg-loader
        name="arrow-right"
        :style="{ transform: 'rotate(180deg)' }"
        class="day-picker__icon"
        @click="goToNextMonth"
      />
    </div>

    <div class="day-picker__weekday-list">
      <div class="day-picker__weekday" v-for="weekday in WEEK_DAYS" :key="weekday">{{ weekday }} </div>
    </div>
    <div class="day-picker__day-list">
      <div
        v-for="day in days"
        :key="day.date"
        @click="setDate(day.date)"
        :class="{
          'day-picker__day': true,
          day: true,
          'day--active': isActive(day.date),
          [`day--${day.type}`]: true,
        }"
      >
        {{ day.number }}
      </div>
    </div>

    <base-button class="day-picker__button" label="امروز" variant="tonal" @click="selectToday" />
  </div>
</template>

<script setup>
  import {
    default as moment,
    DATE_FORMAT,
    ALPHABETIC_DATE_FORMAT_WITHOUT_DAY,
    getWeekDay,
  } from "@cross-cutting/libs/moment.lib.js";

  const props = defineProps({
    modelValue: {
      type: [String, null],
      required: true,
    },
  });

  const emit = defineEmits(["update:modelValue", "click:scene"]);

  const emitSceneClicked = () => emit("click:scene");

  const setDate = (value) => emit("update:modelValue", value);
  const selectToday = () => setDate(moment().format(DATE_FORMAT));
  const goToNextMonth = () => setDate(currentDate.value.clone().add(1, "month").format(DATE_FORMAT));
  const goToPreviousMonth = () => setDate(currentDate.value.clone().subtract(1, "month").format(DATE_FORMAT));

  const isSameDate = (a, b) => a.format(DATE_FORMAT) === b.format(DATE_FORMAT);
  const isToday = (date) => moment().format(DATE_FORMAT) === date.format(DATE_FORMAT);

  const isActive = (date) =>
    currentDate.value.format(DATE_FORMAT) === moment(date, DATE_FORMAT).format(DATE_FORMAT);

  const currentDate = computed(() => moment(props.modelValue, DATE_FORMAT));
  const startOfMonth = computed(() => currentDate.value.clone().startOf("jM"));
  const endOfMonth = computed(() => currentDate.value.clone().endOf("jM"));
  const formattedDate = computed(() => currentDate.value.format(ALPHABETIC_DATE_FORMAT_WITHOUT_DAY));

  const toDateItem = (date, type) => ({
    date: date.format(DATE_FORMAT),
    type: type || (isToday(date) ? "today" : "current"),
    number: date.format("jD"),
  });

  const getCurrentMonthDays = () => {
    const days = [];

    let date = startOfMonth.value.clone();
    const lastDay = endOfMonth.value.clone();

    do {
      days.push(toDateItem(date));

      date = date.add(1, "day");
    } while (!isSameDate(date, lastDay));

    days.push(toDateItem(date));

    return days;
  };
  const getPreviousMonthDays = () => {
    const days = [];
    const startWeekDay = getWeekDay(startOfMonth.value);

    let date = startOfMonth.value.clone().subtract(startWeekDay, "day");

    for (let index = 0; index < startWeekDay; index++) {
      days.push(toDateItem(date, "previous"));
      date = date.add(1, "day");
    }

    return days;
  };
  const getNextMonthDays = () => {
    const days = [];

    const endWeekDay = getWeekDay(endOfMonth.value);

    let date = endOfMonth.value.clone();

    for (let index = 0; index < 6 - endWeekDay; index++) {
      date = date.add(1, "day");
      days.push(toDateItem(date, "next"));
    }

    return days;
  };

  const days = computed(() => [...getPreviousMonthDays(), ...getCurrentMonthDays(), ...getNextMonthDays()]);
  const WEEK_DAYS = ["شنبه", "1شنبه", "2شنبه", "3شنبه", "4شنبه", "5شنبه", "جمعه"];
</script>

<style scoped lang="scss">
  .day-picker {
    @include flex($dir: column, $align: center);
    gap: space(2);

    user-select: none;

    &__button {
      width: 67px;
      margin-top: auto;
    }

    &__day-list,
    &__weekday-list {
      width: 100%;

      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: space(1);
    }

    &__weekday-list {
      @include typography(medium-11);
      color: var(--palette-text-main-3);
    }

    &__weekday {
      @include flex($align: center, $justify: center);
    }

    &__action {
      @include flex($justify: space-between, $align: center);

      padding: space(2);
      width: 100%;
    }

    &__icon {
      width: 32px;
      height: 32px;
      padding: space(2);

      color: var(--palette-text-main-2);
      cursor: pointer;
    }

    &__date {
      @include flex($align: center);
      @include typography(bold-14);

      color: var(--palette-text-main-2);

      cursor: pointer;
    }
  }

  .day {
    @include flex($align: center, $justify: center);
    @include typography(regular-14);

    border-radius: radius(1);
    width: 36px;
    height: 36px;
    border: 1px solid transparent;

    color: var(--palette-text-main-1);
    cursor: pointer;

    transition: all 0.2s ease-in;

    &--active {
      background-color: var(--palette-primary);
      color: var(--palette-text-light);
    }

    &--today {
      border-color: var(--palette-primary);
    }

    &--previous,
    &--next {
      color: var(--palette-text-main-3);
    }

    &:hover {
      background-color: var(--palette-bg-3);
    }

    &:active {
      background-color: var(--palette-bg-4);
    }
  }
</style>
