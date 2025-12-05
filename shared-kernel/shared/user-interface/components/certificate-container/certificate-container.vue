<template>
  <div class="certificate-container">
    <img :src="src" :alt="alt" />
  </div>
</template>
<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
});
</script>
<style lang="scss">
.certificate-container {
  background-color: var(--palette-yellow-100);
  border-radius: 20px;
  box-shadow: 0px 12px 32px 0px #0d151a1a;
  padding: space(4);
  display: flex;

  @include mq(small) {
    padding: space(2);
  }
  > img {
    border-radius: $border-radius-rg;
    width: 100%;
    height: 100%;
    // object-fit: cover;
  }
}
</style>
