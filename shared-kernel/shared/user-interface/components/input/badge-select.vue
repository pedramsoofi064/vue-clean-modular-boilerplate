<template>
  <div class="badge-select">
    <div class="badge-select__content">
      <text-field v-model="textValue" v-bind="$attrs" @keypress.enter="addBadge" />

      <base-button
        variant="icon"
        prepend-icon="plus"
        :loading="$attrs.loading"
        :disabled="isButtonDisabled"
        @click="addBadge"
      />
    </div>

    <transition-group name="list" tag="div" class="badge-select__badge-list">
      <base-badge
        v-for="badge in selectedBadges"
        :key="badge"
        :label="badge"
        icon="close"
        color="neutral"
        @click:icon="removeBadge(badge)"
      />
    </transition-group>
  </div>
</template>

<script setup>
  import { Set } from "@cross-cutting/helpers";

  const props = defineProps({
    modelValue: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits(["update:modelValue"]);
  const selectedBadges = computed({
    get() {
      return props.modelValue || [];
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  const badgeSet = computed(() => new Set(selectedBadges.value));

  const textValue = ref("");
  const addBadge = () => {
    const isBadgeExists = badgeSet.value.has(textValue.value);
    if (isBadgeExists) return;

    selectedBadges.value = [textValue.value, ...selectedBadges.value];
    textValue.value = "";
  };
  const removeBadge = (value) =>
    (selectedBadges.value = selectedBadges.value.filter((badge) => badge !== value));

  const attrs = useAttrs();
  const isButtonDisabled = computed(
    () => attrs.disabled || !textValue.value || badgeSet.value.has(textValue.value),
  );
</script>

<style lang="scss" scoped>
  .badge-select {
    @include flex($dir: column);
    gap: space(3);

    &__content {
      @include flex($align: flex-end);
      gap: space(2);

      width: 100%;
    }

    &__badge-list {
      @include flex($wrap: wrap);
      gap: space(2);
    }
  }
</style>
