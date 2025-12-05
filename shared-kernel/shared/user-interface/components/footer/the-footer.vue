<template>
  <footer class="footer">
    <div class="footer__content container">
      <div class="footer__intro intro">
        <img
          src="@user-interface/shared/assets/images/logo-white.png"
          alt="Company Logo"
          @click="router.push('/')"
          class="intro__logo"
        />
        <h2 class="intro__company-name">
          {{ t("footer.companyName") }}
        </h2>
        <p class="intro__company-desc">
          {{ t("footer.companyDesc") }}
        </p>
        <div class="intro__btns">
          <base-button variant="tonal" @click="router.push('/apply')">
            {{ t("footer.applyBtn") }}
          </base-button>
        </div>
      </div>
      <div class="footer__navigator navigator">
        <ul class="navigator__list">
          <li
            class="list-item"
            v-for="(item, index) in navItems"
            :key="index"
            :class="{ disabled: item.isDisabled }"
          >
            <template v-if="item.children">
              <base-menu
                :label="item.title"
                :items="item.children"
                @itemClicked="menuItemClicked($event)"
                placement="top-left"
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
        <div class="navigator__socials socials">
          <p class="socials__text">{{ t("footer.followUs") }}</p>
          <div class="socials__logos">
            <a
              class="socials__links"
              v-for="(item, index) in socialsLinks"
              :key="index"
              target="_blank"
              :href="item.link"
            >
              <svg-loader :name="item.icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const router = useRouter();

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
    isExpanded: true,
    children: [
      {
        id: 0,
        key: "item1",
        routeName: "AboutUsItem1",
      },
      {
        id: 1,
        key: "item2",
        routeName: "AboutUsItem2",
      },
      {
        id: 2,
        key: "contactUs",
        routeName: "ContactUs",
      },
    ],
  },
]);

const socialsLinks = [
  {
    icon: "instagram",
    link: "https://www.instagram.com/yourcompany",
  },
  {
    icon: "whatsapp",
    link: "https://wa.me/1234567890",
  },
];

const menuItemClicked = (option) => {
  router.push({ name: option.routeName });
};
</script>

<style scoped lang="scss">
.footer {
  height: 428px;
  position: relative;
  padding-top: 100px;
  background-color: #222129;
  color: #fff;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(../../assets/images/footer-bg.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.6;
    mix-blend-mode: Overlay;
    z-index: 1;
  }

  @include mq(medium) {
    height: auto;
    &:before {
      background-image: url(../../assets/images/footer.png);
    }
  }

  &__content {
    margin-top: 70px;
    z-index: 3;
    position: relative;
    @include flex($justify: space-between);

    @include mq(medium) {
      flex-direction: column;
      align-items: center;
      margin-top: 48px;
      padding-bottom: 48px;
      gap: 48px;
    }
  }

  &__intro {
    @include flex($dir: column);
  }

  .intro {
    @include mq(medium) {
      @include flex($dir: column, $align: center);
    }
    &__logo {
      cursor: pointer;
      height: 32px;
    }

    &__company-name {
      margin-top: 24px;
      @include typography(bold-24);

      @include mq(medium) {
        @include typography(bold-20);
      }
    }

    &__company-desc {
      margin-top: 12px;
      @include typography(regular-16);
      @include mq(medium) {
        @include typography(regular-14);
      }
    }

    &__btns {
      margin-top: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: space(4);
    }
  }

  &__navigator {
    @include flex($dir: column, $justify: space-between, $align: flex-end);

    @include mq(medium) {
      align-items: center;
      gap: 48px;
    }
  }

  .navigator {
    height: -webkit-fill-available;

    &__list {
      @include flex();
      @include typography(medium-14);
      gap: 12px;

      @include mq(medium) {
        gap: 0;
      }

      @include mq(small) {
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
    }

    .list-item {
      position: relative;
      height: 44px;
      @include flex($align: center, $justify: center);
      border-radius: 8px;
      padding-inline: 10px;

      @include mq(medium) {
        padding-inline: 4px;
      }

      &__link {
        text-decoration: none;
        color: white;
      }
    }


    .socials {
      &__text {
        @include typography(bold-14);
      }

      &__logos {
        @include flex();
        margin-top: space(4);
        gap: space(6);
      }

      &__links {
        background: #ffffff26;
        width: 40px;
        height: 40px;
        border-radius: $border-radius-rg;
        @include flex($justify: center, $align: center);
        cursor: pointer;
      }
    }
  }
}
</style>
