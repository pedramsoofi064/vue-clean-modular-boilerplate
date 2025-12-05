<template>
  <main class="container">
    <div class="about-item">
      <h1>{{ t("aboutUs.item2.title") }}</h1>
      <p>{{ t("aboutUs.item2.description") }}</p>
    </div>
  </main>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.about-item {
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

