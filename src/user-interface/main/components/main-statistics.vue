<template>
  <section class="main-statistics container">
    <div class="main-statistics__content">
      <div
        class="main-statistics__item item"
        v-for="(item, index) in statistics"
        :key="index"
      >
        <div>
          <svg-loader :name="item.icon" class="item__icon" />
        </div>
        <!-- <img :src="item.icon" class="item__icon" /> -->
        <div class="item__content">
          <p class="item__title">
            {{ t(`mainPage.statistics.${item.translationKey}`) }}
          </p>
          <span class="item__value"
            >+ <count-to class="item__value" :end-val="+item.count" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import { CountTo } from "vue3-count-to";

const { t } = useI18n();

const statistics = reactive([
  {
    icon: "project-plan-pen",
    translationKey: "doneProjects",
    count: "0",
  },
  {
    icon: "certificate-medal",
    translationKey: "awards",
    count: "0",
  },
  {
    icon: "certificate-checkmark",
    translationKey: "certificates",
    count: "0",
  },
  {
    icon: "calendar-schedule",
    translationKey: "experienceYears",
    count: "9",
  },
]);
</script>

<style lang="scss" scoped>
.main-statistics {
  @include mq(small) {
    margin-top: 30px;
  }
  &__content {
    padding: space(8);
    background-color: white;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: space(16);

    @include mq(medium) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include mq(small) {
      grid-template-columns: repeat(1, 1fr);
      padding: space(6);
    }
  }

  &__item {
    @include flex($justify: stretch, $align: stretch);
    gap: space(3);
  }

  .item {
    &__icon {
    }

    &__content {
      @include flex($dir: column, $justify: space-between);
    }

    &__title {
      color: var(--palette-text-main-2);
      @include typography(regular-18);
    }

    &__value {
      direction: ltr;
      color: var(--palette-text-main-3);
      @include typography(bold-32);
    }
  }
}
</style>
