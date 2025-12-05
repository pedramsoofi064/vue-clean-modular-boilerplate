<template>
  <div class="menu" ref="baseMenuRef">
    <div
      @click="onToggleMenu"
      class="menu__toggler"
      role="button"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-haspopup="menu"
      :aria-controls="listId"
      tabindex="0"
      @keydown.enter.prevent="onToggleMenu"
      @keydown.space.prevent="onToggleMenu"
      @keydown.escape.prevent="closeMenu"
    >
      <slot name="toggler-label">
        <span>{{ label }}</span>
      </slot>
      <slot name="open-indicator">
        <div>
          <svg-loader name="arrow-down" />
        </div>
      </slot>
    </div>
    <div
      class="menu__list"
      :class="[{ 'menu__list--open': isOpen }, listPlacementClass]"
    >
      <ul class="menu__ul" :id="listId" role="menu" :style="maxHeightStyle">
        <li
          class="menu__item"
          v-for="option in items"
          :key="option.id"
          role="menuitem"
          tabindex="-1"
          @click="itemClicked(option)"
          @mouseover="onMouseOver(option)"
        >
          <slot :name="`item-${option.key}`" :option="option">
            <p>{{ t(`header.${option.key}`) }}</p>
          </slot>
        </li>
      </ul>
      <div class="menu__pic" v-if="hasPic">
        <img :src="items[hoverdIndex]?.pic" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useI18n } from "vue-i18n";

export default {
  name: "Menu",
  props: {
    items: { type: Array, required: true },
    label: { type: String, default: "" },
    hasPic: {
      type: Boolean,
      default: false,
    },
    /**
     * Dynamic placement in "side-align" form.
     * side: "top" | "bottom"
     * align: "left" | "center" | "right"
     * e.g. "top-left", "bottom-center" (default), "bottom-right"
     */
    placement: {
      type: String,
      default: "bottom",
      validator: (v) =>
        [
          "top-left",
          "top-center",
          "top-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
          "bottom",
        ].includes(v),
    },
    /**
     * Optional max height for dropdown; overrides CSS var.
     * Examples: "250px", "18rem", "40vh"
     */
    maxHeight: { type: String, default: "" },
  },
  emits: ["update:modelValue", "itemClicked"],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const baseMenuRef = ref(null);
    const { t } = useI18n();

    const listId = `menu-list-${Math.random().toString(36).slice(2)}`;

    const onToggleMenu = () => (isOpen.value = !isOpen.value);
    const closeMenu = () => (isOpen.value = false);

    onClickOutside(baseMenuRef, closeMenu);

    const itemClicked = (option) => {
      emit("itemClicked", option);
      closeMenu();
    };

    const listPlacementClass = computed(() => `menu__list--${props.placement}`);

    const maxHeightStyle = computed(() =>
      props.maxHeight ? { "--menu-max-height": props.maxHeight } : {}
    );

    const hoverdIndex = ref(0);
    const onMouseOver = (option) => {
      if (option.id !== hoverdIndex.value) hoverdIndex.value = option.id;
    };

    return {
      isOpen,
      baseMenuRef,
      onToggleMenu,
      itemClicked,
      closeMenu,
      listPlacementClass,
      maxHeightStyle,
      listId,
      t,
      hoverdIndex,
      onMouseOver,
    };
  },
};
</script>

<style lang="scss" scoped>
/* ===========================
   Themeable & Accessible Vars
   Override from parent as needed
   =========================== */
.menu {
  /* layers & shape */
  --menu-z: 20;
  --menu-padding: 4px;
  --menu-radius: 8px;
  --menu-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  /* size */
  --menu-min-width: 220px;
  --menu-max-height: 250px; /* can be overridden via prop */
  --menu-item-height: 40px;

  /* colors */
  --menu-bg: #fff; /* default white as requested */
  --menu-color: #1f2937; /* slate-800-ish */
  --menu-hover-bg: #f3f4f6; /* gray-100-ish */
  --menu-hover-color: var(--palette-primary-dark); /* gray-900-ish */

  /* focus & motion */
  --menu-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.45);

  position: relative;

  &__toggler {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: inherit;
    color: var(--menu-color);
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    user-select: none;
    outline: none;

    &:focus-visible {
      box-shadow: var(--menu-focus-ring);
      border-radius: var(--menu-radius);
    }
  }

  &__list {
    z-index: var(--menu-z);
    position: absolute;
    padding: var(--menu-padding);
    box-shadow: var(--menu-shadow);
    border-radius: var(--menu-radius);
    border: none;
    margin: 0;
    color: var(--menu-color);
    min-width: var(--menu-min-width);
    max-height: var(--menu-max-height);
    overflow-y: auto;
    display: none;
    background-color: var(--menu-bg);

    /* animation defaults; overridden per placement */
    animation: growDown 200ms ease-out forwards;
    transform-origin: top center;

    &--open {
      display: flex;
    }

    /* ======= Bottom placements ======= */
    &--bottom-center {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 8px;
      transform-origin: top center;
      animation-name: growDown;
    }
    &--bottom-left {
      top: 100%;
      left: 0;
      margin-top: 8px;
      transform-origin: top left;
      animation-name: growDown;
    }
    &--bottom-right {
      top: 100%;
      right: 0;
      margin-top: 8px;
      transform-origin: top right;
      animation-name: growDown;

      @include mq(large) {
        right: -200px;
      }
    }

    /* ======= Top placements ======= */
    &--top-center {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 8px;
      transform-origin: bottom center;
      animation-name: growUp;
    }
    &--top-left {
      bottom: 100%;
      left: 0;
      margin-bottom: 8px;
      transform-origin: bottom left;
      animation-name: growUp;
    }
    &--top-right {
      bottom: 100%;
      right: 0;
      margin-bottom: 8px;
      transform-origin: bottom right;
      animation-name: growUp;
    }

    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
      animation: none !important;
    }
  }

  &__pic {
    width: 220px;
    @include flex($justify: center, $align: center);
    > img {
      width: 164px;
      height: 164px;
    }
  }

  &__ul {
    width: 220px;
  }

  &__item {
    height: var(--menu-item-height);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-inline: 12px;
    border-radius: var(--menu-radius);
    outline: none;

    &:hover,
    &:focus-visible {
      background-color: var(--menu-hover-bg);
      color: var(--menu-hover-color);
    }

    &:last-child {
      border: none;
    }
  }
}

/* Animations */
@keyframes growDown {
  0% {
    transform: scaleY(0);
  }
  80% {
    transform: scaleY(1.03);
  }
  100% {
    transform: scaleY(1);
  }
}
@keyframes growUp {
  0% {
    transform: scaleY(0);
  }
  80% {
    transform: scaleY(1.03);
  }
  100% {
    transform: scaleY(1);
  }
}

/* Optional: dark scheme defaults */
// @media (prefers-color-scheme: dark) {
//   .menu {
//     --menu-bg: #0b0f14;
//     --menu-color: #e5e7eb;
//     --menu-hover-bg: #111827;
//     --menu-hover-color: #ffffff;
//     --menu-shadow: rgba(0, 0, 0, 0.5) 0px 6px 24px;
//   }
// }
</style>
