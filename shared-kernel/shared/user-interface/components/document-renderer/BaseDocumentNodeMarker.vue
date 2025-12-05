<template>
  <Component
    :is="renderers.inline[currentMarker]"
    v-if="
      currentMarker &&
      currentMarker !== 'link' &&
      currentMarker !== 'relationship' &&
      node[currentMarker]
    "
  >
    <BaseDocumentNodeMarker
      :remainingMarkers="_remainingMarkers"
      :renderers="renderers"
      :node="node"
    >
      <slot></slot>
    </BaseDocumentNodeMarker>
  </Component>
  <span v-else>
    <slot></slot>
  </span>
</template>

<script>
  export default {
    props: ['remainingMarkers', 'renderers', 'node'],
    computed: {
      currentMarker() {
        return this.remainingMarkers[0] || 'span';
      },
      _remainingMarkers() {
        return this.remainingMarkers.slice(1);
      },
    },
  };
</script>

<style></style>
