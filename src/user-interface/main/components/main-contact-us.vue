<template>
  <section class="contact-us">
    <div class="container">
      <div class="contact-us__content content">
        <div class="desktop">
          <h1 class="content__title">
            {{ t("mainPage.contactUs.title") }}
          </h1>
          <h3 class="content__subtitle">
            {{ t("mainPage.contactUs.subtitle") }}
          </h3>
        </div>

        <div class="contact-us__company-info">
          <div class="company-info__item">
            <div>
              <svg-loader name="cellphone" />
            </div>
            <div class="company-info__value">
              <span class="company-info__text">{{
                t("contactUs.cellphone")
              }}</span>
            </div>
          </div>
          <div class="company-info__item">
            <div>
              <svg-loader name="phone" />
            </div>
            <div class="company-info__value">
              <span class="company-info__text">{{
                t("contactUs.phones")
              }}</span>
            </div>
          </div>
          <div class="company-info__item">
            <div>
              <svg-loader name="email" />
            </div>
            <div class="company-info__value">
              <span class="company-info__text">{{ t("contactUs.email") }}</span>
            </div>
          </div>
          <div class="company-info__item">
            <div>
              <svg-loader name="address" />
            </div>
            <div class="company-info__value">
              <div class="company-info__text">
                {{ t("contactUs.mainAddress") }}
              </div>
              <div class="company-info__text">
                {{ t("contactUs.airportAddress") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-us__form form">
        <div class="form__name">
          <text-field
            :label="t('contactUs.form.firstName')"
            rules="required"
            v-model="formModel.firstName"
          />
          <text-field
            :label="t('contactUs.form.lastName')"
            rules="required"
            v-model="formModel.lastName"
          />
        </div>
        <text-field
          :label="t('contactUs.form.email')"
          rules="required"
          v-model="formModel.email"
        />
        <text-field
          :label="t('contactUs.form.message')"
          textarea
          rules="required"
          :placeholder="t('contactUs.form.messagePlaceHolder')"
          v-model="formModel.message"
        />

        <div class="form__btn">
          <base-button
            append-icon="send"
            type="submit"
            @click="submit"
            :is-loading="loading"
            :rotate-icon="locale === 'en' ? '100deg' : '0deg'"
          >
            {{ t("contactUs.form.send") }}
          </base-button>
        </div>
      </div>

      <div class="mobile">
        <h1 class="content__title">
          {{ t("mainPage.contactUs.title") }}
        </h1>
        <h3 class="content__subtitle">
          {{ t("mainPage.contactUs.subtitle") }}
        </h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useForm } from "vee-validate";
import { ref, computed } from "vue";
import { useMainStore } from "../store";
import { storeToRefs } from "pinia";

const toast = useToast();

const { t, locale } = useI18n();
const { meta: formMeta, validate, resetForm } = useForm();
const mainStore = useMainStore();
const loading = ref(false);

const formModel = ref({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});

const submit = async () => {
  await validate();
  if (!formMeta.value.valid) return;
  loading.value = true;
  try {
    await mainStore.createComment({
      firstName: formModel.value.firstName,
      lastName: formModel.value.lastName,
      email: formModel.value.email,
      message: formModel.value.message,
    });
    formModel.value = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    };
    resetForm();
    toast.show({ type: "success", message: t("contactUs.successMessage") });
  } catch {
    toast.show({ type: "error", message: t("contactUs.errorMessage") });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.contact-us {
  margin-top: 75px;
  margin-bottom: 65px;
  background-image: url("../../shared/assets/images/contact-pattern.png");
  background-position: center;
  background-repeat: no-repeat;

  @include mq(small) {
    background: none;
  }

  .container {
    @include flex($justify: space-between, $align: center);
    gap: space(4);
    @include mq(medium) {
      flex-direction: column-reverse;
      gap: space(8);
    }
  }

  &__content {
    @include flex($dir: column, $justify: space-between);
    gap: 60px;
  }

  .content {
    .desktop {
      @include mq(medium) {
        display: none;
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
      max-width: 420px;
      @include mq(medium) {
        @include typography(bold-32);
        text-align: center;
      }
    }
  }

  .mobile {
    display: none;
    @include mq(medium) {
      display: block;
    }
  }

  &__company-info {
    @include flex($dir: column);
    gap: space(4);
  }

  .company-info {
    &__item {
      @include flex();
      gap: space(6);
    }

    &__text {
      @include typography(medium-16);
      color: var(--palette-text-main-2);

      @include mq(small) {
        @include typography(medium-14);
      }
    }
  }

  &__form {
    background: #0000000d;
    padding: space(6);
    border-radius: 8px;
    @include mq(medium) {
    }
  }

  .form {
    @include flex($dir: column);
    gap: space(4);

    &__name {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: space(6);
      @include mq(small) {
        grid-template-columns: 1fr;
      }

      .text-field {
        width: 296px;
        @include mq(large) {
          width: 200px;
        }
        @include mq(small) {
          width: 326px;
        }
      }
    }

    &__btn {
      margin-right: auto;
      @include mq(small) {
        margin-inline: auto;
      }

      html[lang="en"] & {
        margin-left: auto;
        margin-right: 0;
        @include mq(small) {
          margin-inline: auto;
        }
      }
    }
  }
}
</style>
