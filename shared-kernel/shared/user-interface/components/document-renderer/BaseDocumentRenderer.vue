<template>
  <div class="base-document-renderer">
    <BaseDocumentNode
      v-for="node in documentWithIdComputed"
      :key="node.id"
      :node="node"
      :renderers="_renderers"
    />
  </div>
</template>

<script>
import BaseDocumentNode from "./BaseDocumentNode.vue";
import defaultRenderers from "./DefaultRenderers";

export default {
  props: [
    "document", // JSON type document (Slate-based format)
    "renderers", // Key-value pairs of renderers name and components to render them
    // 'componentBlocks', // may be comming later
  ],
  components: {
    BaseDocumentNode,
  },
  computed: {
    _renderers() {
      // return defaultRenderers;
      return {
        inline: { ...defaultRenderers.inline, ...this.renderers?.inline },
        block: { ...defaultRenderers.block, ...this.renderers?.block },
      };
    },
    documentWithIdComputed() {
      return this.$props.document;
    },
  },
};
</script>

<style lang="scss">
.base-document-renderer {
  display: flex;
  flex-direction: column;
  gap: space(6);
}
</style>
