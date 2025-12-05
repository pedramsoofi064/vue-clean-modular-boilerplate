<template>
  <side-menu class="side-menu" :items="props.items">
    <template #default="{ isDetailsVisible }">
      <div
        :class="{ 'side-menu__profile': true, profile: true, 'profile--open': isUserActionVisible }"
        ref="profileElement"
        @click="openUserAction"
      >
        <base-avatar :src="convertLinkToSrc(userAccount.profileImage)" :alt="userAccount.fullName" />

        <div class="profile__text-box" v-if="isDetailsVisible">
          <span class="profile__title">{{ userAccount.fullName }}</span>
          <span class="profile__subtitle">{{ positionLabel }}</span>
        </div>

        <div class="profile__indicators" v-if="isDetailsVisible">
          <svg-loader name="arrow-small" class="profile__icon" />

          <svg-loader name="arrow-small" class="profile__icon" />
        </div>

        <base-menu
          v-model="isUserActionVisible"
          :reference-element="profileElement"
          title="فضای کار من"
          :take-reference-width="false"
          :actions
          placement="top-end"
          width="268px"
          @action="executeAction"
        >
          <template #action-panel="{ label, url }">
            <radio-button :label :model-value="isPanelActive(url)" />
          </template>
        </base-menu>

      </div>
    </template>
  </side-menu>
</template>

<script setup>
  import { convertLinkToSrc } from "@cross-cutting/helpers";

  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
  });

  const router = useRouter();
  
  // Placeholder user account - replace with your user store
  const userAccount = ref({
    fullName: "User",
    profileImage: "",
    positions: [],
  });
  
  const positionLabel = computed(() => userAccount.value.positions?.[0]?.title || "");

  const profileElement = ref(null);
  const {
    isVisible: isUserActionVisible,
    open: openUserAction,
    close: closeUserAction,
  } = useModalController();

  const actions = computed(() => [
    {
      label: "پروفایل",
      icon: "documents-file-eye",
      onClick: () => {
        // Add profile navigation logic here
        closeUserAction();
      },
    },
    {
      label: "تغییر کلمه عبور",
      icon: "key",
      onClick: () => {
        // Add change password logic here
        closeUserAction();
      },
    },
    {
      label: "خروج",
      icon: "exit-door",
      color: "danger",
      onClick: () => {
        // Add logout logic here
        console.log("Logout");
      },
    },
  ]);

  const executeAction = ({ onClick }) => onClick();
</script>

<style lang="scss" scoped>
  .profile {
    @include flex($align: center);
    gap: space(2);

    padding: space(2);
    border: 1px solid var(--palette-outline-2);
    border-radius: radius(1);

    transition: all 0.3s ease-in;

    cursor: pointer;

    &--open {
      border-color: var(--palette-primary);
    }

    &__text-box {
      @include flex($dir: column);
      gap: space(1);
    }

    &__title {
      @include typography(bold-14);
      color: var(--palette-text-main-2);
    }

    &__subtitle {
      @include typography(regular-12);
      color: var(--palette-text-main-3);
    }

    &__indicators {
      @include flex($dir: column);

      margin-right: auto;
    }

    &__icon {
      color: var(--palette-text-main-4);
      cursor: pointer;

      &:first-child {
        transform: rotate(180deg);

        margin-bottom: - space(3);
      }
    }
  }
</style>
