<template>
  <header class="header">
    <div class="header__title">
      <slot name="title" v-bind="{ title }">
        <span>{{ props.title }}</span>
      </slot>

      <slot name="action" />
    </div>

    <slot name="footer" />
  </header>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .header {
    @include elevation(1);
    @include flex($dir: column);
    gap: space(3);

    padding: space(3) space(4);

    &__title {
      @include typography(bold-20);
      @include flex($align: center, $justify: space-between);

      width: 100%;

      color: var(--palette-text-main-1);
    }
  }
</style>
