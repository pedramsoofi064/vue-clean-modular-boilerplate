<template>
  <div class="tool-tip" ref="tooltipElement">
    <div
      class="tool-tip__activator"
      @click="activateToolTip"
      @mouseenter="activateToolTip(true)"
      @mouseleave="disableToolTip()"
    >
      <slot name="activator" />
    </div>

    <teleport to="#modal" :disabled="!props.teleport">
      <div class="tool-tip__content" v-show="isToolTipActive" ref="contentElement" :style="floatingStyles">
        <slot name="content">{{ props.label }} </slot>

        <div class="tool-tip__arrow" ref="arrowElement" :style="arrowStyles" />
      </div>
    </teleport>
  </div>
</template>

<script setup>
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "top",
      validator: (value) => ["bottom", "top", "left", "right"].includes(value),
    },
    duration: {
      type: Number,
      default({ label }) {
        return Math.max(2000, label.length * 100);
      },
    },
    teleport: {
      type: Boolean,
      default: true,
    },
    showOnHover: Boolean,
    persist: Boolean,
  });

  const tooltipElement = ref(null);
  const contentElement = ref(null);
  const arrowElement = ref(null);

  const isToolTipActive = ref(props.persist);

  const disableToolTip = () => {
    if (props.persist) return;

    isToolTipActive.value = false;
  };
  const activateToolTip = (hovered = false) => {
    isToolTipActive.value = true;

    if (!hovered) setTimeout(disableToolTip, props.duration);
  };

  const { floatingStyles, arrowStyles } = useFloating(tooltipElement, contentElement, {
    placement: props.position,
    takeReferenceWidth: false,
    offset: {
      x: 0,
      y: -2,
    },
    arrow: {
      element: arrowElement,
    },
  });
</script>

<style lang="scss" scoped>
  $root: ".tool-tip";

  #{$root} {
    &__content {
      @include typography(regular-14);
      text-align: center;

      width: fit-content;
      padding: space(1) space(2);
      border-radius: radius(1);

      background-color: var(--palette-default-black);
      color: var(--palette-text-light);

      animation: fade 0.3s;

      z-index: $tooltip;
    }

    &__arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
      transform: rotate(45deg);
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
