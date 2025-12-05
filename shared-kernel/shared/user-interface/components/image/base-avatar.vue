<template>
  <div :class="avatarClasses" v-skeleton="isLoading">
    <img
      :src="props.src"
      :alt="props.alt"
      v-if="!hasError"
      @error="setHasError(true)"
      @load="setIsLoaded(true)"
      class="avatar__image"
    />

    <div v-else class="avatar__fallback">
      <slot name="fallback"> {{ fallback }}</slot>
    </div>

    <div class="avatar__icon" v-if="props.icon && !isLoading" @click.prevent="$emit('click:icon')">
      <svg-loader :name="props.icon" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    src: String,
    alt: String,
    loading: Boolean,
    fallbackLabel: String,
    icon: String,
    size: {
      type: String,
      default: "sm",
      validator(value) {
        return ["xsm", "sm", "md"].includes(value);
      },
    },
  });

  defineEmits(["click:icon"]);

  const extractFirstLetters = (string) =>
    string
      ? string
          .split(" ")
          .slice(0, 2)
          .map((word) => word[0])
          .join(" ")
      : "";
  const fallback = computed(() => props.fallbackLabel || extractFirstLetters(props.alt));

  const hasError = ref();
  const setHasError = (value) => {
    setIsLoaded(value);
    hasError.value = value;
  };

  const isLoaded = ref();
  const setIsLoaded = (value) => (isLoaded.value = value);

  const avatarClasses = useClassModifier(
    "avatar",
    computed(() => ({
      [props.size]: true,
    })),
  );

  const isLoading = computed(() => props.loading || !isLoaded.value);

  watch(
    () => props.src,
    () => {
      const initialValue = !props.src;

      hasError.value = initialValue;
      isLoaded.value = initialValue;
    },
    {
      immediate: true,
    },
  );
</script>

<style lang="scss" scoped>
  $root: ".avatar";

  #{$root} {
    border-radius: $border-radius-circle;
    user-select: none;

    position: relative;

    &--md {
      @include typography(bold-28);

      &,
      #{$root}__fallback {
        width: 80px;
        height: 80px;
      }
    }

    &--sm {
      @include typography(bold-12);

      &,
      #{$root}__fallback {
        width: 40px;
        height: 40px;
      }
    }

    &--xsm {
      @include typography(regular-11);

      overflow: hidden;
      white-space: nowrap;

      &,
      #{$root}__fallback {
        width: 24px;
        height: 24px;
      }
    }

    &__image {
      object-fit: cover;
      border-radius: inherit;
      width: 100%;
      height: 100%;
    }

    &__fallback {
      @include flex($align: center, $justify: center);

      border-radius: inherit;

      background-color: var(--palette-bg-4);
      color: var(--palette-text-main-1);
    }

    &__icon {
      @include flex($align: center, $justify: center);

      position: absolute;
      bottom: -4px;
      left: -10px;
      z-index: calc($skeleton-loading + 1);

      width: 36px;
      height: 36px;

      border-radius: inherit;
      background-color: var(--palette-bg-4);
      border: 4px solid var(--palette-bg-1);

      cursor: pointer;

      > * {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
