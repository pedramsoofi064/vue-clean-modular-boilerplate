<template>
  <div class="profile">
    <base-avatar :src="convertLinkToSrc(props.profileImage)" size="md" :alt="props.fullName" />

    <div class="profile__text-box">
      <div class="profile__title">
        <span>{{ props.fullName }}</span>

        <slot v-bind="{ isBlocked: props.isBlocked }" name="status" v-if="props.hasStatus">
          <base-badge v-bind="getBadgeByBlocked(props.isBlocked)" :rounded="false" />
        </slot>
      </div>

      <span>{{ props.username }}</span>

      <span>{{ props.phoneNumber }}</span>
    </div>
  </div>
</template>

<script setup>
  import { convertLinkToSrc } from "@cross-cutting/helpers";

  const props = defineProps({
    hasStatus: {
      type: Boolean,
      default: true,
    },
    fullName: String,
    profileImage: String,
    isBlocked: Boolean,
    username: String,
    phoneNumber: String,
  });

  const getBadgeByBlocked = (isBlocked) => ({
    label: isBlocked ? "مسدود" : "فعال",
    color: isBlocked ? "danger" : "success",
  });
</script>

<style lang="scss" scoped>
  .profile {
    @include flex();
    gap: space(4);

    &__text-box {
      @include typography(medium-14);
      @include flex($dir: column);
      gap: space(0.5);

      color: var(--palette-text-main-3);
    }

    &__title {
      @include typography(bold-18);
      @include flex($align: center);
      gap: space(2);

      color: var(--palette-text-main-1);
    }
  }
</style>
