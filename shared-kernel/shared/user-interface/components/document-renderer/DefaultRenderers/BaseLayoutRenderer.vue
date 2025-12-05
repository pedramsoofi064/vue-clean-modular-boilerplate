<template>
  <div
    :style="{
      display: 'grid',
      gridTemplateColumns: layout.map((x) => `${x}fr`).join(' '),
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: [
      // 'children', // this goes in slot
      'layout',
    ],
  };
</script>

<style></style>
