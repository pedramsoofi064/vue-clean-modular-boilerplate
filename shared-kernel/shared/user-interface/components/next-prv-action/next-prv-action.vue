<template>
  <div class="next-prv-action">
    <div class="next-prv-action__btn">
      <div>
        <svg-loader name="angle-right" @click="emits('previous')" />
      </div>
    </div>
    <div class="next-prv-action__btn" @click="emits('next')">
      <div>
        <svg-loader name="angle-left" />
      </div>
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(["next", "previous"]);
</script>
<style lang="scss">
.next-prv-action {
  @include flex();
  gap: space(4);

  &__btn {
    cursor: pointer;
    width: var(--btn-width, 48px);
    height: var(--btn-height, 48px);
    background-color: var(--btn-bg-color, #ffffff26);
    @include flex($justify: center, $align: center);
    border-radius: $border-radius-rg;
    color: var(--btn-color, white);

    html[lang="en"] & {
      transform: rotate(180deg);
    }
  }
}
</style>
