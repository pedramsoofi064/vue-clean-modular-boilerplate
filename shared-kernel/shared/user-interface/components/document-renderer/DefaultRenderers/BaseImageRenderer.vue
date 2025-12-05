<template>
  <div class="image-block" v-if="!loading">
    <img :src="img.file.url" alt="" :style="{ width: imgWidth }">
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';

const GET_REPORT_IMAGE_BY_ID = gql`
  query GetReportImageById($id: ID!) {
    reportImage(where: { id: $id }) {
      id
      alt
      file {
        url
        width
        height
      }
    }
  }
`

const props = defineProps([
  "image", 'caption', "width"
])

const variables = computed(() => ({ id: props.image.id })); // or pass as a prop

const { result, loading, error, refetch } = useQuery(GET_REPORT_IMAGE_BY_ID, variables);
const img = computed(() => result.value?.reportImage || null);
const imgWidth = computed(() => props.width === 'full' ? '100%' : '50%');




</script>

<style labg="scss">
.image-block {
  display: flex;
  align-items: center;
  justify-content: center;
  >img {
    border-radius: 12px;
  }
}
</style>
