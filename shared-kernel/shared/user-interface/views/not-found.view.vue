<template>
  <div class="not-found" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
    <svg-loader name="404" class="not-found__icon" />

    <div class="not-found__text-box">
      <span class="not-found__subtitle">{{ t("notFound.message") }}</span>

      <base-button :label="t('notFound.backButton')" :block="false" @click="router.push('/')" />
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useI18n } from "vue-i18n";
  
  const router = useRouter();
  const { t, locale } = useI18n();
</script>

<style lang="scss" scoped>
  .not-found {
    @include flex($align: center, $justify: center);

    gap: space(20);

    width: 100dvw;
    height: 100dvh;

    &__text-box {
      @include flex($dir: column);

      gap: space(4);
    }

    &__title {
      @include typography(bold-28);

      color: var(--palette-text-main-1);
    }

    &__subtitle {
      @include typography(regular-16);

      color: var(--palette-text-main-2);
    }

    @include mq(large) {
      gap: space(5);
    }

    @include mq(medium) {
      flex-direction: column;
      gap: 0;

      &__text-box {
        align-items: center;
      }
    }
  }
</style>
