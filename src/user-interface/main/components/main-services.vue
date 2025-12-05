<template>
  <section class="services">
    <div class="services__main container">
      <div class="services__content">
        <div class="services__title">
          <div class="services__text">{{ t("mainPage.services.title") }}</div>
          <div class="services__desc">
            {{ t("mainPage.services.description") }}
          </div>
        </div>
        <div class="services__items">
          <div class="desktop">
            <div
              class="service-item"
              v-for="(item, index) in services"
              :key="index"
              @click="itemClicked(index)"
              :class="{ expanded: expandedIndex === index }"
            >
              <div class="service-item__title">
                <span class="service-item__bullet"></span>
                <h5 class="service-item__text">
                  {{ t(`mainPage.services.titles.${item.translationKey}`) }}
                </h5>
              </div>
              <collapsible-container
                class="service-item__desc"
                :collapsed="expandedIndex === index"
              >
                {{ t(`mainPage.services.descriptions.${item.translationKey}`) }}
              </collapsible-container>
              <span class="service-item__line"></span>
            </div>
          </div>
          <div class="mobile">
            <div
              class="service-item"
              v-for="(item, index) in services"
              :key="index"
            >
              <img class="service-item__bg" :src="imageSrc(item.image)" />
              <div class="service-item__overlay"></div>
              <div class="service-item__content">
                <div class="service-item__title">
                  <span class="service-item__bullet"></span>
                  <h5 class="service-item__text">
                    {{ t(`mainPage.services.titles.${item.translationKey}`) }}
                  </h5>
                </div>
                <div class="service-item__desc">
                  {{
                    t(`mainPage.services.descriptions.${item.translationKey}`)
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="services__image">
        <img
          class="services__img"
          :src="imageSrc(services[expandedIndex].image)"
        />
        <span class="square"></span>
      </div>

      <img
        class="services__vertical-dots"
        src="@user-interface/shared/assets/images/vertical-dots.png"
        alt=""
      />
    </div>
    <img
      class="services__map-readers"
      src="@user-interface/shared/assets/images/map-readers.png"
      alt=""
    />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { onMounted, onUnmounted, reactive, ref } from "vue";

const { t } = useI18n();

const router = useRouter();

const imageSrc = (image) =>
  new URL(`/src/user-interface/shared/assets/images/${image}`, import.meta.url)
    .href;

const services = reactive([
  {
    translationKey: "templateText",
    image: "projectAndManagement.png",
  },
  {
    translationKey: "templateText",
    image: "civilSkills.png",
  },
  {
    translationKey: "templateText",
    image: "structuralEngineering.png",
  },
]);

const expandedIndex = ref(0);

const itemClicked = (index) => {
  expandedIndex.value = index;
  clearInterval(expandedInterval.value);
  expandedInterval.value = setInterval(() => {
    let temp = expandedIndex.value + 1;
    expandedIndex.value = temp % services.length;
  }, 10000);
};

const expandedInterval = ref();

onMounted(() => {
  expandedInterval.value = setInterval(() => {
    let temp = expandedIndex.value + 1;
    expandedIndex.value = temp % 5;
  }, 10000);
});
onUnmounted(() => {
  clearInterval(expandedInterval.value);
});
</script>

<style lang="scss" scoped>
.container {
  @include mq(medium) {
    max-width: 992px;
  }
}
.services {
  margin-top: 70px;
  // padding-bottom: 100px;
  position: relative;
  @include mq(small) {
    padding-bottom: 80px;
  }

  &__main {
    @include flex();
    gap: 80px;
    position: relative;
    @include mq(medium) {
      gap: space(4);
    }
  }

  &__content {
    gap: space(20);
    width: 60%;
    z-index: 2;
    @include mq(small) {
      width: 100%;
    }
    // @include mq(medium) {
    //   width: 70%;
    // }
  }

  &__title {
    @include mq(small) {
      text-align: center;
    }
  }

  &__text {
    @include typography(bold-56);
    font-size: 80px;
    color: var(--palette-primary-light);
    @include mq(small) {
      font-size: 70px;
    }
  }

  &__desc {
    @include typography(bold-40);
    color: var(--palette-text-main-2);
    margin-top: -30px;
    @include mq(small) {
      @include typography(bold-32);
    }
  }

  &__items {
    @include flex($dir: column);
    margin-top: 32px;
    gap: space(4);
    min-height: 400px;
    .desktop {
      @include flex($dir: column, $align: center, $justify: center);
      gap: 16px;
      @include mq(x-small) {
        display: none;
      }
      .service-item {
        padding: space(4);
        border-radius: $border-radius-rg;
        border: 2px solid var(--palette-outline-2);
        width: 100%;
        background-color: white;
        cursor: pointer;
        transition: all 0.5s;
        position: relative;

        &__title {
          @include flex($align: center);
          gap: space(3);
        }

        &__text {
          @include typography(bold-20);
          color: var(--palette-text-main-1);
        }

        &__bullet {
          width: 12px;
          height: 12px;
          border-radius: $border-radius-circle;
          border: 1px solid var(--palette-gray-700);
        }

        &__desc {
          @include typography(regular-18);
          color: var(--palette-text-main-2);
        }

        &__line {
          width: 0;
          height: 4px;
          background-color: var(--palette-primary-dark);
          position: absolute;
          bottom: -2px;
          left: -2px;
          transition: width 0.5s;
          border-radius: 0 0 0 $border-radius-rg;
          @include mq(x-small) {
            display: none;
          }
        }

        &.expanded {
          background-color: var(--palette-primary-light);
          border-color: transparent;

          .service-item__title {
            margin-bottom: space(4);
          }

          .service-item__text {
            color: var(--palette-primary-dark);
          }

          .service-item__bullet {
            background-color: var(--palette-primary-dark);
            border-color: var(--palette-primary-dark);
          }

          .service-item__line {
            animation: expandLine 10s linear forwards;
          }

          @keyframes expandLine {
            from {
              width: 0%;
            }

            to {
              width: 100%;
            }
          }
        }
      }
    }

    .mobile {
      display: none;
      width: 100%;
      @include mq(x-small) {
        @include flex($dir: column, $align: center, $justify: center);
        gap: 16px;
      }

      .service-item {
        width: 350px;
        min-height: 480px;
        border-radius: 16px;
        position: relative;
        overflow: hidden;
        &__bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        &__overlay {
          background: #000000b2;
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        &__content {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          z-index: 2;
          padding: space(6) space(3);
          color: #fff;
          @include flex($dir: column, $justify: flex-end);
        }

        &__title {
          @include typography(bold-20);
          @include flex($align: center);
          gap: space(3);
        }

        &__bullet {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #fff;
          display: block;
        }

        &__desc {
          @include typography(regular-16);
          margin-top: space(3);
        }
      }
    }
  }

  &__image {
    padding: space(4);
    position: relative;

    @include mq(medium) {
      margin-block: auto;
    }
    @include mq(small) {
      display: none;
    }

    .square {
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: -20px;
      right: 0;
      z-index: 1;
      background-color: #ffe8cc; // unknown color
      border-radius: $border-radius-rg;
    }
  }

  &__img {
    width: 375px;
    aspect-ratio: 2/3;
    border-radius: 16px;
    z-index: 2;
    position: relative;
  }

  &__vertical-dots {
    position: absolute;
    left: 0;
    top: -20px;
    @include mq(small) {
      display: none;
    }
  }

  &__map-readers {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-54%);
    @include mq(small) {
      display: none;
    }
  }
}
</style>
