<template>
  <div class="container main-certificates">
    <div class="main-certificates__content" v-if="currentCertificate">
      <div class="main-certificates__name">
        <h1 class="main-certificates__title">
          {{ t("mainPage.certificates.title") }}
        </h1>
        <h3 class="main-certificates__subtitle">
          {{ t("mainPage.certificates.subtitle") }}
        </h3>
        <p class="main-certificates__desc">
          {{ t("mainPage.certificates.description") }}
        </p>
        <div class="main-certificates__action">
          <div class="main-certificate__name">
            {{ currentCertificate[translateKey("title")] }}
          </div>
          <div class="main-certificate__btn">
            <next-prv-action @next="next()" @previous="previous()" />
          </div>
        </div>
      </div>
    </div>

    <div class="main-certificates__images" v-if="!loading">
      <div class="images">
        <swiper
          :slides-per-view="'auto'"
          :space-between="10"
          :free-mode="true"
          @slideChange="onSlideChange"
          @swiper="onSwiper"
        >
          <swiper-slide v-for="(item, index) in certificates" :key="index">
            <certificate-container class="certificate" :src="item.image.url" />
          </swiper-slide>
          <swiper-slide class="certificate"></swiper-slide>
          <!-- <swiper-slide class="certificate" ></swiper-slide> -->
        </swiper>
        <div class="mobile-btn mobile-btn--rigth" @click="previous()">
          <div>
            <svg-loader name="angle-right" />
          </div>
        </div>
        <div class="mobile-btn mobile-btn--left" @click="next()">
          <div>
            <svg-loader name="angle-left" />
          </div>
        </div>
      </div>
      <div class="main-certificates__mobile-name">
        {{ currentCertificate[translateKey("title")] }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import { useTranslateKey } from "@user-interface/shared/composables/useTranslateKey";
const { translateKey } = useTranslateKey();
const { t } = useI18n();

const certificates = ref([]);
const loading = ref(false);

const swiperRef = ref(null);
const onSwiper = (instance) => {
  swiperRef.value = instance;
};

const currentIndex = ref(0);

const currentCertificate = computed(
  () => certificates.value[currentIndex.value]
);

const next = () => {
  if (swiperRef.value && currentIndex.value + 1 < certificates.value.length)
    swiperRef.value?.slideNext();
};
const previous = () => {
  if (swiperRef.value) swiperRef.value?.slidePrev();
};

const onSlideChange = () => {
  currentIndex.value = swiperRef.value.activeIndex;
};
</script>

<style lang="scss">
.container {
  @include mq(medium) {
    max-width: 992px !important;
  }
  @include mq(small) {
    max-width: 540px !important;
  }
}
.main-certificates {
  margin-top: 100px;
  max-height: 490px;
  @include flex($align: stretch, $justify: stretch);
  gap: 50px;
  position: relative;
  @include mq(small) {
    gap: 16px;
  }

  @include mq(medium) {
    margin-top: 60px;
    max-width: 992px;
  }
  @include mq(small) {
    flex-direction: column;
    max-height: unset;
  }

  &__content {
    width: 45%;
    display: flex;
    align-items: center;
    @include mq(medium) {
      width: 50%;
    }
  }

  &__title {
    @include typography(bold-56);
    font-size: 80px;
    color: var(--palette-primary-light);
    @include mq(medium) {
      font-size: 70px;
      text-align: center;
    }
  }

  &__subtitle {
    @include typography(bold-40);
    color: var(--palette-text-main-2);
    margin-top: -30px;
    @include mq(medium) {
      @include typography(bold-32);
      text-align: center;
    }
  }

  &__desc {
    margin-top: space(8);
    @include typography(regular-18);
    color: var(--palette-text-main-2);
  }

  &__action {
    @include flex($justify: space-between);
    width: 100%;
    margin-top: space(8);

    @include mq(small) {
      display: none;
    }
  }

  &__name {
    @include typography(bold-24);
    color: var(--palette-text-main-2);
  }

  &__mobile-name {
    @include typography(bold-20);
    color: var(--palette-text-main-2);
    text-align: center;
    margin-top: space(4);
    display: none;
    @include mq(small) {
      display: block;
    }
  }

  &__btn {
  }

  .next-prv-action {
    --btn-bg-color: var(--palette-primary-light);
    --btn-color: var(--palette-primary);
  }

  &__images {
    // display: flex;
    // @include flex($align: center);
    position: relative;
    flex: 1;
    height: 490px;

    @include mq(small) {
      height: 270px;
    }

    .images {
      position: absolute;
      height: 100%;
      top: 0;
      bottom: 0;
      left: -100%;
      right: 0;

      html[lang="en"] & {
        right: -100%;
        left: 0;
      }
      @include mq(small) {
        position: relative;
      }
      .mobile-btn {
        width: 48px;
        height: 48px;
        background: #00000099;
        @include flex($justify: center, $align: center);
        display: none;

        border-radius: $border-radius-rg;
        position: absolute;
        z-index: 4;
        color: #fff;
        cursor: pointer;
        top: 50%;
        transform: translateY(-50%);
        @include mq(small) {
          display: flex;
        }

        &--left {
          left: 0;
        }

        &--rigth {
          right: 0;
        }
      }
    }
  }

  .swiper {
    width: 100%;
    height: 490px;
    @include mq(small) {
      height: 270px;
    }
    /* control container height */
  }

  .swiper-wrapper {
    align-items: center;
    height: 100%;
  }

  .swiper-slide {
    /* Make slide width dynamic but capped,
       and include padding inside that cap */
    width: auto;
    max-width: 500px;

    /* <= your requirement */
    box-sizing: border-box;
    padding: 16px;

    /* Center the certificate inside the slide */
    display: flex;
    align-items: center;
    justify-content: center;

    /* Avoid extra width due to long inline content */
    white-space: normal;

    /* Don’t let Swiper shrink the slide below content size */
    flex-shrink: 0;

    @include mq(medium) {
      max-width: 350px;
    }
    @include mq(small) {
      padding: 4px;
      max-width: unset;
    }
  }

  .certificate {
    /* Fill the slide but never exceed it */
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    display: block;
    /* avoid inline gaps */

    /* If your component renders an <img>, ensure it fits: */
    img {
      display: block;
      max-width: 100%;
      max-height: 415px;
      width: 100%;
      height: auto;
      object-fit: contain;
      /* keep full certificate visible */
      @include mq(small) {
        max-height: 250px;
      }
    }
  }
}
</style>
