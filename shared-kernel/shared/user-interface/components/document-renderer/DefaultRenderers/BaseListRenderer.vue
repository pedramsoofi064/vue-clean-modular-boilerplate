<template>
  <Component :is="tagName">
    <slot></slot>
  </Component>
</template>

<script>
  export default {
    props: [
      // 'children', // this goes in slot
      'type',
    ],
    computed: {
      tagName() {
        return this.type === 'ordered' ? 'ol' : 'ul';
      },
    },
  };
</script>

<style></style>
