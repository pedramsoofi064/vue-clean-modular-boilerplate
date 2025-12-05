<template>
  <main class="container">
    <div class="item1">
      <h1>{{ t("item1.title") }}</h1>
      <p>{{ t("item1.description") }}</p>
    </div>
  </main>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.item1 {
  padding: space(11) 10%;

  @include mq(large) {
    padding: space(8) 5%;
  }

  @include mq(small) {
    padding: space(4);
    padding-bottom: 80px;
  }

  h1 {
    @include typography(bold-32);
    color: var(--palette-text-main-1);
    margin-bottom: space(4);
  }

  p {
    @include typography(regular-16);
    color: var(--palette-text-main-2);
  }
}
</style>

