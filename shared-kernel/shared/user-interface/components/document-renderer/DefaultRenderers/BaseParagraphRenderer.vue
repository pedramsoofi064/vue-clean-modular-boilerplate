<template>
  <p :style="{ textAlign }">
    <slot></slot>
  </p>
</template>

<script>
  export default {
    props: [
      // 'children', // this goes in slot
      'textAlign',
    ],
  };
</script>

<style></style>
