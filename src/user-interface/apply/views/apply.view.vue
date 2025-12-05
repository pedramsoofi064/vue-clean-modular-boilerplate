<template>
  <main class="apply">
    <div class="apply__content" v-if="!isFormSebmitted">
      <div class="apply__info info">
        <h1 class="info__title">{{ t("apply.title") }}</h1>
        <p class="info__desc">{{ t("apply.description") }}</p>

        <div class="info__company-info desktop">
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
              <span class="company-info__text">{{ t("apply.email") }}</span>
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
      <div class="apply__form form">
        <div class="form__fields">
          <text-field
            :label="t('apply.form.fullname')"
            rules="required"
            size="lg"
            v-model="formModel.fullName"
          />
          <date-field
            :label="t('apply.form.birthDate')"
            size="lg"
            v-model="formModel.birthDate"
          />
        </div>
        <radio-group-tile
          :label="t('apply.form.gender')"
          :options="genderOptions"
          v-model="formModel.gender"
        >
        </radio-group-tile>
        <radio-group-tile
          :label="t('apply.form.marriageStatus')"
          :options="marriageOptions"
          v-model="formModel.marriageStatus"
        >
        </radio-group-tile>
        <div class="form__fields">
          <text-field
            :label="t('apply.form.email')"
            rules="required"
            placeholder="example@email.com"
            size="lg"
            v-model="formModel.email"
          />
          <file-picker
            :label="t('apply.form.resume')"
            :description="t('apply.form.resumeDesc')"
            v-model="formModel.resume"
          />
        </div>
        <base-button
          class="form__btn"
          append-icon="send"
          size="lg"
          @click="submitForm"
          :is-loading="loading"
          :rotate-icon="locale === 'en' ? '100deg' : '0deg'"
        >
          {{ t("contactUs.form.send") }}
        </base-button>
        <!-- <div class="form__divider"></div> -->
        <!-- <div class="form__fields">
          <text-field :label="t('apply.form.captcha')" rules="required" size="lg" />
          <div class="form__captcha captcha">
            <div class="captcha__image"></div>
            <div class="captcha__refresh">
              <svg-loader name="refresh"></svg-loader>
            </div>
            <base-button class="captcha__btn" append-icon="send" size="lg" @click="submitForm">
              {{ t('contactUs.form.send') }}
            </base-button>
          </div>
        </div> -->
      </div>
      <div class="info">
        <div class="info__company-info mobile">
          <div class="company-info__item">
            <svg-loader class="company-info__icon" name="cellphone" />
            <div class="company-info__value">
              <span class="company-info__text">{{ t("apply.cellphone") }}</span>
            </div>
          </div>
          <div class="company-info__item">
            <svg-loader class="company-info__icon" name="phone" />
            <div class="company-info__value">
              <span class="company-info__text">{{ t("apply.phones") }}</span>
            </div>
          </div>
          <div class="company-info__item">
            <svg-loader class="company-info__icon" name="email" />
            <div class="company-info__value">
              <span class="company-info__text">{{ t("apply.email") }}</span>
            </div>
          </div>
          <div class="company-info__item">
            <svg-loader class="company-info__icon" name="address" />
            <div class="company-info__value">
              <div class="company-info__text">{{ t("apply.mainAddress") }}</div>
              <div class="company-info__text">
                {{ t("apply.airportAddress") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="done" v-else>
      <div class="done__content">
        <img
          class="done__img"
          src="@user-interface/shared/assets/images/apply-done.png"
          alt=""
        />
        <h3 class="done__title">{{ t("apply.doneTitle") }}</h3>
        <p class="done__desc">{{ t("apply.doneDesc") }}</p>
        <base-button class="done__btn" size="lg" @click="router.push('/')">{{
          t("apply.doneBtnTitle")
        }}</base-button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
import { useForm } from "vee-validate";
import { useApplyStore } from "../store";
import { storeToRefs } from "pinia";
import {
  default as moment,
  ENGLISH_DATE_FORMAT,
  DATE_FORMAT,
} from "@cross-cutting/libs/moment.lib.js";

const router = useRouter();
const toast = useToast();
const { t  , locale} = useI18n();
const { meta: formMeta, validate, resetForm } = useForm();
const applyStore = useApplyStore();
const { loading } = storeToRefs(applyStore);

const genderOptions = [
  { value: "male", label: t("apply.form.male") },
  { value: "female", label: t("apply.form.female") },
];

const marriageOptions = [
  { value: "single", label: t("apply.form.single") },
  { value: "married", label: t("apply.form.married") },
];

const isFormSebmitted = ref(false);
const formModel = ref({
  fullName: "",
  birthDate: "",
  gender: "",
  marriageStatus: "",
  resume: null,
  email: "",
});

const submitForm = async () => {
  await validate();
  if (!formMeta.value.valid) return;
  if (!formModel.value.resume) {
    toast.show({ type: "error", message: t("apply.form.resumeMissed") });
    return;
  }

  const genderValue = Array.isArray(formModel.value.gender)
    ? formModel.value.gender[0]?.value ?? ""
    : typeof formModel.value.gender === "object" &&
        formModel.value.gender !== null
      ? formModel.value.gender.value ?? ""
      : formModel.value.gender ?? "";

  const marriageValue = Array.isArray(formModel.value.marriageStatus)
    ? formModel.value.marriageStatus[0]?.value ?? ""
    : typeof formModel.value.marriageStatus === "object" &&
        formModel.value.marriageStatus !== null
      ? formModel.value.marriageStatus.value ?? ""
      : formModel.value.marriageStatus ?? "";

  const birthDateISO = formModel.value.birthDate
    ? moment(formModel.value.birthDate, DATE_FORMAT).format(ENGLISH_DATE_FORMAT)
    : undefined;

  const payload = {
    fullName: formModel.value.fullName,
    email: formModel.value.email,
    ...(birthDateISO && { birthDate: birthDateISO }),
    ...(genderValue && { gender: genderValue }),
    ...(marriageValue && { marriageStatus: marriageValue }),
    ...(formModel.value.resume && {
      resume: { upload: formModel.value.resume },
    }),
  };

  try {
    const response = await applyStore.createApplication(payload);
    formModel.value = {
      fullName: "",
      birthDate: "",
      gender: "",
      marriageStatus: "",
      resume: null,
      email: "",
    };
    resetForm();
    toast.show({ type: "success", message: t("apply.form.successMessage") });
    isFormSebmitted.value = true;
  } catch {
    toast.show({ type: "error", message: t("apply.form.errorMessage") });
  }
};
</script>

<style lang="scss" scoped>
.apply {
  padding: space(11) 10%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  @include mq(large) {
    padding: space(8) 5%;
  }

  @include mq(small) {
    padding: space(4);
    padding-bottom: 80px;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: space(16);
    @include mq(large) {
      gap: space(4);
    }

    @include mq(medium) {
      // grid-template-columns: 1fr;
      display: flex;
      flex-direction: column;
    }
  }

  &__info {
  }

  .info {
    &__title {
      @include typography(bold-32);
      color: var(--palette-text-main-1);

      @include mq(small) {
        text-align: center;
        @include typography(bold-28);
      }
    }

    &__desc {
      @include typography(regular-16);
      color: var(--palette-text-main-2);
      margin-top: space(9);
      margin-bottom: space(16);
      max-width: 560px;
      @include mq(small) {
        margin-bottom: space(6);
        text-align: center;
        max-width: unset;
      }
      @include mq(x-small) {
        margin: 0;
        margin-top: space(9);
      }
    }

    &__company-info {
      @include flex($dir: column);
      gap: space(4);
      margin-top: auto;

      &.desktop {
        @include mq(medium) {
          display: none;
        }
      }

      &.mobile {
        display: none;
        @include mq(medium) {
          display: flex;
          margin-top: space(6);
        }
      }
    }

    .company-info {
      &__item {
        @include flex();
        gap: space(6);
      }

      &__icon {
        min-width: 24px;
        min-height: 24px;
      }

      &__text {
        @include typography(medium-16);
        color: var(--palette-text-main-2);
      }
    }
  }

  &__form {
    background-color: var(--palette-bg-2);
    padding: space(6);
    border-radius: 12px;
  }

  .form {
    @include flex($dir: column, $align: stretch, $justify: stretch);
    gap: space(4);

    &__fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: space(6);
      @include mq(x-small) {
        grid-template-columns: 1fr;
        grid-row-gap: space(6);
      }
    }

    &__btn {
      margin-top: space(8);
      margin-right: auto;
      width: 100px;
      @include mq(x-small) {
        width: 100%;
      }
    }

    &__divider {
      height: 1px;
      width: 100%;
      background-color: var(--palette-outline-2);
      margin-block: space(5);
    }

    &__captcha {
      margin-top: space(6);
    }

    .captcha {
      @include flex($align: center);
      gap: space(3);

      &__image {
        height: 44px;
        width: 80px;
        background-color: #eeeeee;
        border-radius: 8px;
      }

      &__refresh {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background-color: white;
        border: 1px solid var(--palette-outline-3);
        @include flex($align: center, $justify: center);
        cursor: pointer;
      }

      &__btn {
        width: 96px;
      }
    }
  }

  .done {
    @include flex($justify: center, $align: center);
    height: 100%;

    &__content {
      @include flex($dir: column, $justify: center, $align: center);
    }

    &__title {
      @include typography(bold-16);
      color: var(--palette-text-main-1);
      margin-top: space(8);
    }

    &__desc {
      @include typography(regular-16);
      color: var(--palette-text-main-2);
      margin-top: space(3);
    }

    &__btn {
      margin-top: space(8);
    }
  }
}
</style>
