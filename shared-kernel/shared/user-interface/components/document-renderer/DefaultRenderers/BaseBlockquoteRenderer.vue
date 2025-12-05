<template>
  <blockquote class="blockquote">
    <div class="blockquote-content">
      <slot></slot>
    </div>
  </blockquote>
</template>

<script>
export default {
  props: [
    "level",
    // 'children', // this goes in slot
    "textAlign",
  ],
  computed: {
    tagName() {
      return `h${this.level}`;
    },
  },
};
</script>

<style lang="scss">
.blockquote {
  padding: space(6) space(16);

  @include mq(small) {
    padding: space(6);
  }
  .blockquote-content {
    padding: space(1) space(6);
    @include typography(medium-16);
    color: var(--palette-text-main-2);
    border-right: 3px solid var(--palette-orange-400);
  }
}
</style>
