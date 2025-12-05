<template>
  <section class="main-hero" :style="containerStyle" id="main-hero">
    <div class="main-hero__content container">
      <div class="main-hero__intro intro">
        <img
          src="@user-interface/shared/assets/images/logo.png"
          alt="logo"
          class="intro__logo"
        />
        <h1 class="intro__company-name">
          {{ t("mainPage.mainHero.companyName") }}
        </h1>
        <h3 class="intro__company-slogan">
          {{ t("mainPage.mainHero.companySlogan") }}
        </h3>
        <p class="intro__company-desc">
          {{ t("mainPage.mainHero.companyDesc") }}
        </p>
        <div class="intro__btns">
          <base-button variant="text" @click="router.push('/apply')" size="lg">
            {{ t("mainPage.mainHero.applyBtn") }}
          </base-button>
        </div>
      </div>
      <div class="main-hero__gallery gallery">
        <div class="gallery__item">
          <div
            class="image image--1"
            :class="[isImageChanged[0] ? 'changing' : '']"
            id="image-1"
            v-skeleton="loading"
          >
            <img
              class="image__img"
              :src="shownImages[0]?.url"
              :alt="shownImages[0]?.alt"
            />
          </div>
        </div>
        <div class="gallery__item">
          <div
            class="image image--2"
            :class="[isImageChanged[1] ? 'changing' : '']"
            id="image-2"
            v-skeleton="loading"
          >
            <img
              class="image__img"
              :src="shownImages[1]?.url"
              :alt="shownImages[1]?.alt"
            />
          </div>
        </div>
        <div class="gallery__item">
          <div
            class="image image--3"
            :class="[isImageChanged[2] ? 'changing' : '']"
            id="image-3"
            v-skeleton="loading"
          >
            <img
              class="image__img"
              :src="shownImages[2]?.url"
              :alt="shownImages[2]?.alt"
            />
            <img
              src="@user-interface/shared/assets/images/horizental-dots.png"
              class="dots"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { onMounted, computed, ref, watch, onBeforeUnmount } from "vue";
const { t } = useI18n();
import { useImageRotator } from "../composables/useImageRotator";

const img1Height = ref(0);
const img2Height = ref(0);
const img3Height = ref(0);

const updateHeights = () => {
  const i1 = document.getElementById("image-1");
  const i2 = document.getElementById("image-2");
  const i3 = document.getElementById("image-3");

  img1Height.value = i1?.offsetHeight || 0;
  img2Height.value = i2?.offsetHeight || 0;
  img3Height.value = i3?.offsetHeight || 0;
};

const containerStyle = computed(() => {
  if (window.innerWidth < 992) return {};
  const coefficient = window.innerWidth > 1200 ? 2 : 1;
  const h =
    Math.floor(
      img1Height.value / coefficient +
        img2Height.value / coefficient +
        img3Height.value
    ) + (coefficient === 2 ? 50 : -50);
  return {
    height: `${h}px`,
  };
});

const router = useRouter();

// Helper function to get image URL
const getImageUrl = (imagePath) => {
  return new URL(`../../shared/assets/images/${imagePath}`, import.meta.url).href;
};

// Constant array of images
const MAIN_HERO_IMAGES = [
  {
    id: 1,
    url: getImageUrl("main-hero-sample1.png"),
    alt: "Sample Image 1",
  },
  {
    id: 2,
    url: getImageUrl("main-hero-sample2.png"),
    alt: "Sample Image 2",
  },
  {
    id: 3,
    url: getImageUrl("main-hero-sample3.png"),
    alt: "Sample Image 3",
  },
  {
    id: 4,
    url: getImageUrl("main-hero-sample1.png"),
    alt: "Sample Image 4",
  },
  {
    id: 5,
    url: getImageUrl("main-hero-sample2.png"),
    alt: "Sample Image 5",
  },
  {
    id: 6,
    url: getImageUrl("main-hero-sample3.png"),
    alt: "Sample Image 6",
  },
];

const images = ref(MAIN_HERO_IMAGES);
const loading = ref(false);

const { shownImages, start, stop, normalizeOnImagesChange } = useImageRotator(
  images,
  [5000, 10000, 15000]
);

const isImageChanged = ref([false, false, false]);
watch(
  () => shownImages.value[0],
  (newVal, oldVal) => {
    if (newVal && oldVal && newVal.id !== oldVal.id) {
      isImageChanged.value[0] = true;
      setTimeout(() => (isImageChanged.value[0] = false), 600);
    }
  },
  { deep: true }
);
watch(
  () => shownImages.value[1],
  (newVal, oldVal) => {
    if (newVal && oldVal && newVal.id !== oldVal.id) {
      isImageChanged.value[1] = true;
      setTimeout(() => (isImageChanged.value[1] = false), 600);
    }
  },
  { deep: true }
);
watch(
  () => shownImages.value[2],
  (newVal, oldVal) => {
    if (newVal && oldVal && newVal.id !== oldVal.id) {
      isImageChanged.value[2] = true;
      setTimeout(() => (isImageChanged.value[2] = false), 600);
    }
  },
  { deep: true }
);

onMounted(() => {
  updateHeights();
  window.addEventListener("resize", updateHeights);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateHeights);
  stop();
});

// Initialize image rotator
onMounted(() => {
  normalizeOnImagesChange();
  start();
});
</script>

<style lang="scss" scoped>
.main-hero {
  padding-block: space(16);

  @include mq(medium) {
    padding: space(6);
  }
  @include mq(x-small) {
    padding: 0;
  }
  &__content {
    gap: 70px;
    @include flex($justify: stretch, $align: stretch);
    max-height: 480px;
    @include mq(medium) {
      flex-direction: column;
      align-items: center;
      max-height: unset;
      gap: 60px;
    }
  }

  &__intro {
    padding-top: space(15);
    max-width: 490px;
    color: var(--palette-text-main-1);
    @include mq(medium) {
      padding-top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .intro {
    &__logo {
      height: 80px;
      @include mq(small) {
        display: none;
      }
    }

    &__company-name {
      margin-top: space(8);
      @include typography(bold-56);
      @include mq(medium) {
        @include typography(bold-40);
      }
      @include mq(small) {
        text-align: center;
      }
    }

    &__company-slogan {
      margin-top: space(4);
      @include typography(medium-28);
      @include mq(medium) {
        margin-top: space(3);

        @include typography(medium-20);
      }
      @include mq(small) {
        text-align: center;
      }
    }

    &__company-desc {
      margin-top: space(4);

      @include typography(regular-18);
      color: var(--palette-text-main-2);
      @include mq(medium) {
        margin-top: space(3);

        @include typography(regular-16);
      }
    }

    &__btns {
      margin-top: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: space(4);
      @include mq(x-small) {
        grid-template-columns: 1fr;
      }
    }
  }

  .gallery {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    flex: 1;

    @include mq(medium) {
      display: block;
    }

    &__item {
      position: relative;
    }

    .image {
      aspect-ratio: 3/2;
      position: absolute;
      width: 100%;
      padding: 10px;
      background-color: white;
      border-radius: 18px;

      &.changing img {
        transition: all 0.6s ease-in-out;
        // filter: blur(10px);
        animation: fade 0.6s ease-in;
        @keyframes fade {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          0% {
            opacity: 1;
          }
        }
      }

      @include mq(medium) {
        position: relative;
      }
      .dots {
        left: 0;
        position: absolute;
        left: 20%;
        bottom: -30%;
        z-index: 1;
        @include mq(medium) {
          display: none;
        }
      }

      &__img {
        border-radius: 12px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 3;
      }

      &--1 {
        max-width: 578px;
        width: 578px;
        height: 384px;

        @include mq(1520px) {
          width: 478px;
          height: 284px;
        }

        @include mq(1440px) {
          width: 377px;
          height: 250px;
        }

        html[lang="en"] & {
          right: -10%;

          @include mq(1520px) {
            right: 5%;
          }
          @include mq(1440px) {
            right: -10%;
          }
          @include mq(1200px) {
            right: 0;
          }
        }
      }

      &--2 {
        left: -5%;
        top: -15%;
        width: 433px;
        height: 319px;

        @include mq(1520px) {
          width: 377px;
          height: 250px;
          left: 15%;
        }

        @include mq(1440px) {
          width: 377px;
          height: 250px;
          left: -15%;
        }

        @include mq(1300px) {
          right: 40%;
          top: -30%;
          left: unset;
        }

        @include mq(1200px) {
          right: 0;
          left: unset;
          top: 15%;
        }

        @include mq(medium) {
          margin-top: -45px;
        }

        html[lang="en"] & {
          left: 10%;

          @include mq(1440px) {
            left: 0;
          }
        }
      }

      &--3 {
        right: 17%;
        top: -20%;

        width: 543px;
        height: 361px;

        @include mq(1520px) {
          width: 448px;
          height: 261px;
          right: 10%;
          top: -52%;
        }

        @include mq(1440px) {
          width: 377px;
          height: 250px;
          top: -71%;
        }

        @include mq(1300px) {
          left: unset;
        }

        @include mq(1200px) {
          right: 0;
          left: unset;
          top: 15%;
        }
        @include mq(medium) {
          margin-top: -45px;
        }

        html[lang="en"] & {
          right: 5%;

          @include mq(1520px) {
            right: 17%;
          }
          @include mq(1440px) {
            right: -10%;
            top: -48%;
          }
          @include mq(1200px) {
            right: 0;
            top: 15%;
          }
        }
        // @include mq(large) {
        //     right: 0;
        // }
      }
    }
  }
}
</style>
