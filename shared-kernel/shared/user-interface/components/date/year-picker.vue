<template>
  <div class="year-picker">
    <div
      v-for="year in yearList"
      :key="year"
      @click="setDate(year)"
      :class="{ 'year-picker__year': true, year: true, 'year--active': isActive(year) }"
      ref="years"
    >
      {{ year }}
    </div>
  </div>
</template>

<script setup>
  import { default as moment, DATE_FORMAT } from "@cross-cutting/libs/moment.lib.js";

  const props = defineProps({
    modelValue: {
      type: [String, null],
      required: true,
    },
    preCount: {
      type: Number,
      default: 100,
    },
    postCount: {
      type: Number,
      default: 50,
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  const currentDate = computed(() => moment(props.modelValue, DATE_FORMAT));

  const setDate = (year) => {
    const date = moment()
      .jYear(year)
      .jMonth(+currentDate.value.format("jM") - 1)
      .jDate(+currentDate.value.format("jD"));

    emit("update:modelValue", date.format(DATE_FORMAT));
  };
  const isActive = (year) => currentDate.value.format("jYYYY") == year;

  const currentYear = +currentDate.value.format("jYYYY");
  const yearList = [
    ...Array.from({ length: props.preCount }, (_, index) => currentYear - props.preCount + index),
    currentYear,
    ...Array.from({ length: props.postCount }, (_, index) => currentYear + index + 1),
  ];

  const years = ref([]);
  const scrollSelectedYear = () => {
    const index = yearList.indexOf(currentYear);

    years.value[index].scrollIntoView();
  };

  onMounted(scrollSelectedYear);
</script>

<style lang="scss" scoped>
  .year-picker {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: space(3);

    height: 320px;

    user-select: none;
  }

  .year {
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
