<template>
  <div class="date-picker">
    <day-picker
      v-model="date"
      v-if="scene === 'day'"
      @click:scene="goToNextScene"
      @update:model-value="emit('select', $event)"
    />

    <month-picker v-model="date" v-else-if="scene === 'month'" @update:model-value="goToNextScene" />

    <year-picker v-model="date" v-else @update:model-value="goToNextScene" />
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

  const emit = defineEmits(["update:modelValue", "select"]);

  const scene = ref("day");
  const NEXT_SCENE = {
    day: "month",
    month: "year",
    year: "day",
  };

  const goToNextScene = () => (scene.value = NEXT_SCENE[scene.value]);

  const date = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  onMounted(() => {
  
    if (!props.modelValue) date.value = moment().format(DATE_FORMAT);
   
    
  });
</script>

<style scoped lang="scss">
  .date-picker {
    width: 292px;
  }
</style>
