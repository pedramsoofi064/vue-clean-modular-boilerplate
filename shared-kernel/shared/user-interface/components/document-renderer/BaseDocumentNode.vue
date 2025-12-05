<template>
  <span class="base-document-node">
    <template v-if="typeof xnode.text === 'string'">
      <BaseDocumentNodeMarker :remainingMarkers="Object.keys(renderers.inline)" :renderers="renderers" :node="xnode">{{
        xnode.text === " " ? "&nbsp;" : xnode.text
        }}</BaseDocumentNodeMarker>
    </template>
    <template v-else>
      <Component :is="renderers.block.blockquote" v-if="node.type === 'blockquote'">
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </Component>
      <Component :is="renderers.block.paragraph" :textAlign="node.textAlign" v-else-if="node.type === 'paragraph'">
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </Component>
      <Component :is="renderers.block.code" v-else-if="
        node.type === 'code' &&
        node.children.length === 1 &&
        node.children[0] &&
        typeof node.children[0].text === 'string'
      ">
        {{ node.children[0].text }}
      </Component>
      <Component :is="renderers.block.layout" :layout="node.layout" v-else-if="node.type === 'layout'">
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </Component>
      <Component :is="renderers.block.divider" v-else-if="node.type === 'divider'" />
      <Component :is="renderers.block.heading" v-else-if="node.type === 'heading'" :textAlign="node.textAlign"
        :level="node.level">
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </Component>
      <Component :is="renderers.block.list" v-else-if="['ordered-list', 'unordered-list'].includes(node.type)"
        :type="node.type === 'ordered-list' ? 'ordered' : 'unordered'">
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </Component>
      <Component :is="renderers.block.listItem" v-else-if="['list-item'].includes(node.type)">
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </Component>
      <Component :is="renderers.block.listItemContent" v-else-if="['list-item-content'].includes(node.type)">
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </Component>
      <Component :is="renderers.inline.relationship" v-else-if="node.type === 'relationship'"
        :relationship="node.relationship" :data="node.data">
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </Component>
      <Component :is="renderers.block.link" v-else-if="node.type === 'link'" :href="node.href">
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </Component>
      <Component :is="renderers.block['component-block']" v-else-if="node.type === 'component-block'" v-bind="node.props"></Component>
      <template v-else>
        <BaseDocumentNode v-for="(nodeItem, index) of node.children" :key="index" :node="nodeItem"
          :renderers="renderers" />
      </template>
    </template>
  </span>
</template>

<script>
import BaseDocumentNodeMarker from "./BaseDocumentNodeMarker.vue";

export default {
  props: [
    "node",
    "renderers", // Key-value pairs of renderers name and components to render them
    // 'componentBlocks', // may be comming later
  ],
 
  components: {
    BaseDocumentNodeMarker,
  },
  data() {
    return {
      xnode: this.node,
    };
  },
};
</script>

<style></style>
