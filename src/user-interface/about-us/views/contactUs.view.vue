<template>
  <main class="container">
    <div class="about">
      <h1>{{ t("about.title") }}</h1>
      <div class="about__intro intor">
        <div class="intro__texts">
          <p class="about__text">
            {{ t("about.p-1") }}
          </p>
          <p class="about__text">
            {{ t("about.p-2") }}
          </p>
          <p class="about__text">
            {{ t("about.p-3") }}
          </p>
        </div>
        <img
          class="intro__image"
          src="@user-interface/shared/assets/images/about-us.png"
        />
      </div>
      <div class="about__rank">
        <div class="rank">
          <div>
            <svg-loader name="check-green"></svg-loader>
          </div>
          <div class="rank__content">
            <div class="rank__title">
              {{ t("about.rank-1") }}
            </div>
            <div class="rank__value">
              {{ t("about.templateText") }}
            </div>
          </div>
        </div>
        <div class="rank">
          <div>
            <svg-loader name="check-green"></svg-loader>
          </div>
          <div class="rank__content">
            <div class="rank__title">
              {{ t("about.rank-1") }}
            </div>
            <div class="rank__value">
              {{ t("about.templateText") }}
            </div>
          </div>
        </div>
        <div class="rank">
          <div>
            <svg-loader name="check-green"></svg-loader>
          </div>
          <div class="rank__content">
            <div class="rank__title">
              {{ t("about.rank-3") }}
            </div>
            <div class="rank__value">
              {{ t("about.templateText") }}
            </div>
          </div>
        </div>
      </div>
      <div class="about__texts">
        <p class="about__text">
          {{ t("about.p-4") }}
        </p>
        <p class="about__text">
          {{ t("about.p-5") }}
        </p>
        <p class="about__text">
          {{ t("about.p-6") }}
        </p>
        <p class="about__text">
          {{ t("about.p-7") }}
        </p>
        <p class="about__text">
          {{ t("about.p-8") }}
        </p>
        <p class="about__text">
          {{ t("about.p-9") }}
        </p>
      </div>
      <div class="about__company-info company-info">
        <h2 class="company-info__title">{{ t("about.contactUs") }}</h2>
        <div class="company-info__item">
          <svg-loader name="cellphone" />
          <div class="company-info__value">
            <span class="company-info__text">{{ t("apply.cellphone") }}</span>
          </div>
        </div>
        <div class="company-info__item">
          <svg-loader name="phone" />
          <div class="company-info__value">
            <span class="company-info__text">{{ t("apply.phones") }}</span>
          </div>
        </div>
        <div class="company-info__item">
          <svg-loader name="email" />
          <div class="company-info__value">
            <span class="company-info__text">{{ t("contactUs.email") }}</span>
          </div>
        </div>
        <div class="company-info__item">
          <svg-loader name="address" />
          <div class="company-info__value">
            <div class="company-info__text">{{ t("apply.mainAddress") }}</div>
            <div class="company-info__text">
              {{ t("apply.airportAddress") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
const { t } = useI18n();
const router = useRouter();
</script>

<style lang="scss" scoped>
.about {
  padding: space(11) 10%;

  @include mq(large) {
    padding: space(8) 5%;
  }

  @include mq(small) {
    padding: space(4) 0%;
    padding-bottom: 80px;
  }

  &__title {
    @include typography(bold-32);
    color: var(--palette-text-main-1);
    @include mq(small) {
      @include typography(bold-28);
      text-align: center;
    }
  }

  &__intro {
    @include flex($align: center);
    margin-top: space(8);
    gap: space(8);

    @include mq(medium) {
      flex-direction: column-reverse;
    }
  }

  .intro {
    &__texts {
      @include flex($dir: column);
      gap: space(8);
    }

    &__image {
      width: 50%;
      aspect-ratio: 3/2;

      @include mq(medium) {
        width: 100%;
      }
    }
  }

  &__texts {
    @include flex($dir: column);
    gap: space(8);
    margin-top: space(8);
  }

  &__text {
    @include typography(regular-16);
    color: var(--palette-text-main-2);
  }

  &__rank {
    margin-top: space(8);
    @include flex($align: center, $justify: center);
    gap: space(8);

    @include mq(medium) {
      flex-direction: column;
    }

    .rank {
      @include flex($align: center, $justify: center);
      padding: space(4);
      border-radius: 57px;
      background: #ffffff;
      box-shadow: 0px 4px 25px 0px #1500671f;
      gap: space(3);
      padding-left: space(12);
      width: 240px;

      &__title {
        @include typography(bold-20);
        color: var(--palette-text-main-1);
      }

      &__value {
        @include typography(regular-16);
        color: var(--palette-text-main-2);
      }
    }
  }

  &__company-info {
    margin-top: space(8);
  }

  .company-info {
    margin-bottom: space(6);
    &__title {
      @include typography(bold-32);
      color: var(--palette-text-main-1);
      margin-bottom: space(6);
    }

    &__item {
      @include flex();
      gap: space(6);
    }

    &__text {
      @include typography(medium-16);
      color: var(--palette-text-main-2);
    }
  }
}
</style>
