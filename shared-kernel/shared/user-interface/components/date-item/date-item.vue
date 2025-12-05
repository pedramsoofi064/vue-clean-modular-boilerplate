<template>
  <div class="date-item">
    <svg-loader :name="icon" />
    <span>{{ title }}</span>
    {{ convertedDate }}
  </div>
</template>

<script setup>
import { useLocale } from "@user-interface/shared/composables/useLocale";

const { locale } = useLocale();
const props = defineProps({
  icon: {
    type: String,
    default: "calendar",
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
});

const convertedDate = computed(() => {
  if (!props.date) return "";

  const d = props.date instanceof Date ? props.date : new Date(props.date);

  const opts = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  if (locale.value === "fa") {
    // Persian calendar + Persian digits
    return new Intl.DateTimeFormat("fa-IR", opts).format(d);
  }

  // English digits
  return new Intl.DateTimeFormat("en-US", opts).format(d);
});
</script>

<style lang="scss" scoped>
.date-item {
  @include flex($align:center);
  @include typography(regular-14);
  color: var(--palette-text-main-3);
  gap: space(2);
  @include mq(small) {
    @include typography(regular-12);
  }
}
</style>
