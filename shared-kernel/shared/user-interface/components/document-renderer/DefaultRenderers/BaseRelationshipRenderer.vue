<template>
  <span>
    {{ content }}
  </span>
</template>

<script>
  export default {
    props: ['relationship', 'data'],
    computed: {
      content() {
        return this.data?.label || this.data?.id;
      },
    },
  };
</script>

<style></style>
