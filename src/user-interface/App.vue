<template>
  <layout>
    <router-view-wrapper />

  </layout>

  <div id="modal" />

  <toast-manager />
</template>

<script setup>
const layout = defineAsyncComponent(() => import("@shared-kernel/shared/user-interface/layouts/layout.vue"));

import { ref, onMounted, onUnmounted } from 'vue';

const scrolled = ref(false);
const headerRef = ref(null);
let rafId = null;
let scrollEl = null;

const handleScroll = () => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    const scrollTop = scrollEl === window ? window.scrollY : scrollEl.scrollTop;
    scrolled.value = scrollTop > 100;
  });
};

onMounted(() => {
  // get the scrolling element (#app)
  scrollEl = document.getElementById('app') ?? window;

  // add listener to the actual scroll container
  scrollEl.addEventListener('scroll', handleScroll, { passive: true });
  // initial check
  handleScroll();
});

onUnmounted(() => {
  if (scrollEl) scrollEl.removeEventListener('scroll', handleScroll);
  if (rafId) cancelAnimationFrame(rafId);
});

</script>

<style lang="scss">
//FIXME</style>
