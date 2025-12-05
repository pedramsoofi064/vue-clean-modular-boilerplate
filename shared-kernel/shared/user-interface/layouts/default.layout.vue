<template>
  <div class="default-layout" id="default-layout" ref="el">
    <the-header :style="computedStyle" />
    <div class="default-layout__content">
      <slot />
    </div>

    <the-footer />
  </div>
</template>

<script setup>
import { useScroll } from "@vueuse/core";
import { computed } from "vue";
import { useTemplateRef } from "vue";

const el = useTemplateRef("el");

const { arrivedState, x } = useScroll(el);

const computedStyle = computed(() => {
  return {
    'backgroundColor': !arrivedState.top && window.innerWidth > 768 ? 'white' : ''
  };
});

// const xElm = addCustomRequestPayload
</script>

<style lang="scss">
.default-layout {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 62px;

  &__content {
    min-height: 100dvh;
    margin-bottom: -100px;
    border-radius: 0 0 80px 80px;
    background-color: white;
    z-index: 2;
    position: relative;
    padding-bottom: 100px;

    @include mq(small) {
      padding-bottom: 50px;
    }

    &::before {
      z-index: -1;
      content: "";
      position: absolute;
      top: -150px;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(
        to right,
        #1500800f 1px,
        transparent 1px
      );
      background-size: min(calc(100% / 10), 180px) 100%;

      @include mq(medium) {
        background-image: linear-gradient(
          to right,
          #1500800f 1px,
          transparent 1px
        );
        background-size: min(calc(100% / 8), 180px) 100%;
      }
      @include mq(small) {
        background-image: linear-gradient(
          to right,
          #1500800f 1px,
          transparent 1px
        );
        background-size: min(calc(100% / 6), 180px) 100%;
      }
    }
  }
}
</style>
