<template>
  <Component :is="tagName" href="x.html">
    <slot></slot>
  </Component>
</template>

<script>
  export default {
    props: [
      'level',
      // 'children', // this goes in slot
      'textAlign',
    ],
    computed: {
      tagName() {
        return `h${this.level}`;
      },
    },
  };
</script>

<style></style>
