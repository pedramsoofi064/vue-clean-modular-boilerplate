<template>
  <header class="header">
    <div class="desktop container">
      <div class="header__items items">
        <img
          src="@user-interface/shared/assets/images/logo.png"
          alt="Company Logo"
          class="header__logo"
          @click="router.push('/')"
        />
        <ul class="header__list">
          <li
            class="list-item"
            v-for="(item, index) in navItems"
            :key="index"
            :class="{
              'list-item--active': isAncestorActiveByName(item.routeName),
            }"
          >
            <template v-if="item.children">
              <base-menu
                :label="item.title"
                :items="item.children"
                @itemClicked="menuItemClicked($event)"
                has-pic
                placement="bottom-right"
              >
                <template #toggler-label>
                  <span class="list-item__link">{{
                    t(`header.${item.key}`)
                  }}</span>
                </template>
              </base-menu>
            </template>
            <template v-else>
              <router-link
                class="list-item__link"
                :to="{ name: item.routeName, params: { locale: $i18n.locale } }"
              >
                {{ t(`header.${item.key}`) }}
              </router-link>
            </template>
          </li>
        </ul>
      </div>
      <div class="header__lang">
        <locale-switcher />
      </div>
    </div>
    <div class="mobile">
      <span class="mobile__burger" @click="isMobileMenuOpen = true">
        <div>
          <svg-loader name="burger"/>
        </div>
        <!-- <img src="@user-interface/shared/assets/svg/burger.svg" /> -->
      </span>
      <span class="mobile__title">
        {{ t("header.companyName") }}
      </span>
      <img
        src="@user-interface/shared/assets/images/logo.png"
        alt="لوگو پی ریزان توس "
        class="header__logo"
        @click="router.push('/')"
      />
      <div class="mobile__line"></div>

      <div class="mobile__menu menu" :class="{ open: isMobileMenuOpen }">
        <div class="menu__back-drop" @click="isMobileMenuOpen = false"></div>
        <div class="menu__main">
          <div class="menu__logo">
            <img
              src="@user-interface/shared/assets/images/logo.png"
              alt="Company Logo"
              class="header__logo"
            />
            <span class="mobile__title">
              {{ t("header.companyName") }}
            </span>
          </div>
          <div class="menu__list">
            <div
              class="menu__list-item menu-item"
              v-for="(item, index) in navItems"
              :key="index"
              :class="{
                'menu-item--active': isAncestorActiveByName(item.routeName),
                'menu-item--expanded': item.isExpanded,
              }"
            >
              <template v-if="!item.children">
                <div class="menu-item__content" @click="menuItemClicked(item)">
                  <span class="menu-item__title">
                    {{ t(`header.${item.key}`) }}
                  </span>
                </div>
              </template>
              <template v-else>
                <div
                  class="menu-item__content"
                  @click="item.isExpanded = !item.isExpanded"
                  :class="{ expanded: item.isExpanded }"
                >
                  <span class="menu-item__title">
                    {{ t(`header.${item.key}`) }}
                  </span>
                  <svg-loader class="menu-item__icon" name="arrow-down" />
                </div>
                <div class="menu-item__sub">
                  <div
                    v-for="(i, index) in item.children"
                    :key="index"
                    class="menu-item__sub-item"
                    @click="menuItemClicked(i)"
                    :class="{ active: isAncestorActiveByName(i.routeName) }"
                  >
                    {{ t(`header.${i.key}`) }}
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="menu__lang">
            <locale-switcher
              class="menu__lang-switcher"
              @click="isMobileMenuOpen = false"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const router = useRouter();
const route = useRoute();

const isAncestorActiveByName = (parentName) => {
  return route.matched.some((r) => r.name === parentName);
};

const imageSrc = (image) =>
  new URL(`/src/user-interface/shared/assets/images/${image}`, import.meta.url)
    .href;

const navItems = reactive([
  {
    key: "mainPage",
    routeName: "Main",
  },
  {
    key: "item1",
    routeName: "Item1",
  },
  {
    key: "item2",
    routeName: "Item2",
  },
  {
    key: "item3",
    routeName: "Item3",
  },
  {
    key: "apply",
    routeName: "Apply",
  },
  {
    key: "aboutUs",
    isExpanded: false,
    routeName: "AboutUs",
    children: [
      {
        id: 0,
        key: "item1",
        routeName: "AboutUsItem1",
        pic: imageSrc("header-0.png"),
      },
      {
        id: 1,
        key: "item2",
        routeName: "AboutUsItem2",
        pic: imageSrc("header-1.png"),
      },
      {
        id: 2,
        key: "contactUs",
        routeName: "ContactUs",
        pic: imageSrc("header-5.png"),
      },
    ],
  },
]);

const menuItemClicked = (option) => {
  router.push({ name: option.routeName });
  isMobileMenuOpen.value = false;
};

const isMobileMenuOpen = ref(false);
</script>

<style scoped lang="scss">
.header {
  z-index: 999;
  position: relative;
  @include flex($justify: space-between, $align: center);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.3s;

  .desktop {
    @include flex($justify: space-between, $align: center);
    width: 100%;
    height: 76px;

    @include mq(small) {
      display: none;
    }
  }

  &__items {
    gap: space(8);
    @include flex($align: center);
    height: 44px;

    @include mq(992px) {
      gap: space(2);
    }
  }

  &__logo {
    height: 32px;
    cursor: pointer;
  }

  &__list {
    gap: 32px;
    @include flex();
    @include typography(regular-14);

    @include mq(992px) {
      gap: space(2);
    }
  }
}

.list-item {
  position: relative;
  height: 44px;
  @include flex($align: center, $justify: center);
  border-radius: 8px;
  padding-inline: 10px;

  &:hover {
    background-color: var(--palette-primary-light);
  }

  &__link {
    text-decoration: none;
    color: var(--palette-text-main-2);
  }

  &--active {
    .list-item__link {
      color: var(--palette-orange-500);
    }

    &::before {
      content: "";
      width: 16px;
      height: 4px;
      background-color: var(--palette-orange-400);
      position: absolute;
      left: 50%;
      border-radius: 4px;
      transform: translateX(-50%);
      bottom: 0px;
    }
  }
}

.mobile {
  @include flex($justify: space-between, $align: center);
  width: 100%;
  display: none;
  height: 62px;
  padding: space(4);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: rgba(255, 255, 255, 0.2); /* semi-transparent */
    backdrop-filter: blur(10px); /* the magic */
    -webkit-backdrop-filter: blur(10px);
  }

  @include mq(small) {
    display: flex;
  }

  &__title {
    @include typography(bold-16);
    color: var(--palette-text-main-1);
  }

  &__burger {
    width: 48px;
    height: 48px;
    background-color: var(--palette-primary-light);
    border-radius: $border-radius-rg;
    @include flex($justify: center, $align: center);
    cursor: pointer;
  }

  &__line {
    position: absolute;
    height: 2px;
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__menu {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1000;

    &.open {
      pointer-events: auto;
    }
  }

  .menu {
    &__back-drop {
      position: fixed;
      inset: 0;
      background: rgba(0, 14, 38, 0.35);
      backdrop-filter: blur(12px);
      opacity: 0;
      left: 0;
      right: 0;
      transition:
        opacity 200ms ease,
        left 280ms ease,
        right 280ms ease;
      z-index: 0;
    }

    &__main {
      position: fixed;
      top: 0;
      bottom: 0;
      background-color: var(--palette-bg-1);
      width: 280px;
      overflow: auto;
      transform: translateX(100%);
      transition: transform 280ms ease;
      will-change: transform;
      z-index: 1;
      display: flex;
      flex-direction: column;

      html[lang="fa"] & {
        transform: translateX(100%);
      }

      html[lang="en"] & {
        transform: translateX(-100%);
      }
    }

    &.open {
      .menu__back-drop {
        opacity: 1;
        html[lang="fa"] & {
          right: 280px;
          left: 0;
        }
        html[lang="en"] & {
          left: 280px;
          right: 0;
        }
      }

      .menu__main {
        transform: translateX(0%);

        padding: space(4);
      }
    }

    &__logo {
      @include flex($align: center);
      gap: space(4);
    }

    &__list {
      @include flex($dir: column);
      gap: space(3);
      margin-top: space(3);
    }

    &__list-item {
      padding: 10px;
    }

    .menu-item {
      &__content {
        @include flex($align: center);
        gap: space(1);
        @include typography(medium-16);
        color: var(--palette-text-main-1);
      }

      &__title {
        cursor: pointer;
      }

      &__icon {
        transition: all 0.5s;
      }

      &__sub {
        padding-inline: 24px;
        @include flex($dir: column);
        gap: space(3);
        margin-top: space(3);
        @include typography(medium-14);
        color: var(--palette-text-main-2);
        height: 0;
        overflow: hidden;
        transition: height 0.5s;
      }

      &--active {
        .menu-item__content {
          color: var(--palette-orange-500);
        }
      }

      &--expanded {
        .menu-item__icon {
          transform: rotate(180deg);
        }

        .menu-item__sub {
          height: 180px;
        }

        .menu-item__sub-item {
          cursor: pointer;

          &.active {
            color: var(--palette-orange-500);
          }
        }
      }
    }

    &__lang {
      margin-top: auto;
      --item-width: 60px;
      --item-height: 40px;
      @include flex($align: center, $justify: center);
    }

    &__lang-switcher {
      width: 137px;
    }
  }
}
</style>
