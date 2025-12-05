<template>
  <div
    :class="sideMenuClasses"
    @pointerenter="!isExpanded && setIsHovered(true)"
    @pointerleave="!isExpanded && setIsHovered(false)"
  >
    <div class="side-menu__header">
      <div class="side-menu__logo">
        <svg-loader name="elevated-logo" />

        <svg-loader name="text-logo" v-if="isDetailsVisible" />
      </div>

      <base-button v-bind="toggleButton" @click="toggleIsExpanded" v-if="isDetailsVisible" />
    </div>

    <div class="side-menu__nav nav">
      <div class="nav__group" v-for="group in mappedItems" :key="group.name">
        <span class="nav__label" v-if="group.label">{{ group.label }}</span>

        <div class="nav__item" v-for="item in group.children" :key="item.name">
          <div :class="getLinkClasses(item, false)" @click="toggleOpen(item)">
            <svg-loader :name="item.iconName" v-if="item.iconName" class="nav__icon" />

            <span v-if="isDetailsVisible">{{ item.label }}</span>

            <div class="link__action" v-if="isDetailsVisible">
              <div v-if="item.badgeNumber" class="link__badge" :style="getBadgeStyle(item)">
                {{ item.badgeNumber }}
              </div>
              <svg-loader name="arrow-small" class="nav__icon" v-if="item.children" />
            </div>
          </div>

          <transition name="fade-in">
            <div class="nav__group" v-if="isOpen(item)">
              <div
                v-for="innerItem in item.children"
                :key="innerItem.name"
                :class="getLinkClasses(innerItem, true)"
                @click="navigateTo(innerItem)"
              >
                {{ innerItem.label }}
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="side-menu__content">
      <slot v-bind="{ isExpanded, isHovered, isDetailsVisible }" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    items: {
      type: Array,
      required: true,
      validator(value) {
        return !value.some((item) => !("name" in item));
      },
    },
    persistKey: {
      type: String,
      default: "sidebar",
    },
    fixed: {
      type: Boolean,
      required: true,
    },
  });

  const emit = defineEmits(["update:fixed"]);

  const { isVisible: isHovered, setVisibility: setIsHovered } = useModalController();
  const { isVisible: isExpanded, toggle: toggleIsExpanded } = useModalController({
    onBeforeOpen() {
      setIsHovered(false);
    },
    defaultValue: true,
    persistKey: props.persistKey,
  });

  const isIdle = computed(() => isExpanded.value || isHovered.value);
  const isDetailsVisible = useDelayedComputed({ value: isIdle, applyDelay: isHovered });
  const isFixed = useDelayedComputed({
    value: isHovered,
    applyDelay: () => !isHovered.value,
  });
  watch(isFixed, () => emit("update:fixed", isFixed.value));

  const sideMenuClasses = useClassModifier(
    "side-menu",
    computed(() => ({
      expanded: isExpanded.value,
      hovered: isHovered.value,
      fixed: isFixed.value,
    })),
  );

  const route = useRoute();
  const router = useRouter();

  const mappedItems = ref([]);
  const openedItems = new Set();

  const isActive = (item) =>
    route.matched.some((route) => route.name === item.name) &&
    !Object.keys(getDifference(item.params ?? {}, route.params)).length;

  const isOpen = (item) => item.children?.length && openedItems.has(item.name) && isIdle.value;
  const hasActiveChild = (item) => item.children?.length && item.children.some(isActive);

  const toRefinedChildren = (children) =>
    children.map((child) => {
      const innerChildren = child.children || [];
      const mappedInnerChildren = innerChildren.map((child) => ({ ...child, isActive: isActive(child) }));

      const hasChildren = innerChildren.length;

      return {
        ...child,
        isActive: hasChildren ? hasActiveChild(child) : isActive(child),
        ...(hasChildren && { isOpen: isOpen(child), children: mappedInnerChildren }),
      };
    });

  const toRefinedGroups = (groups) =>
    groups.map((group) => {
      const children = group.children || [];

      return { ...group, children: toRefinedChildren(children) };
    });

  const initItems = () => (mappedItems.value = toRefinedGroups(props.items));
  const initOpenedItems = () => {
    for (const group of props.items) {
      for (const item of group.children) {
        if (hasActiveChild(item)) openedItems.add(item.name);
      }
    }
  };

  watch(() => [props.items, route, isHovered], initItems, { deep: true });
  onMounted(() => {
    initOpenedItems();
    initItems();
  });

  const getLinkClasses = (item, isInner = false) => ({
    nav__link: true,
    link: true,
    "link--active": item.isActive,
    "link--open": item.isOpen && isIdle.value,
    "link--inner": isInner,
  });
  const getBadgeStyle = (item) => ({ marginLeft: item.children ? "0" : "24px" });

  const toggleOpen = (item) => {
    navigateTo(item);

    if (isOpen(item)) {
      openedItems.delete(item.name);
    } else {
      openedItems.add(item.name);
    }

    initItems();
  };

  const navigateTo = ({ name, params }) => {
    if (router.hasRoute(name)) router.push({ name, params });
  };

  const toggleButton = computed(() => ({
    variant: "icon",
    prependIcon: isExpanded.value ? "menu-collaps-expand" : "menu-dock",
  }));
</script>

<style lang="scss" scoped>
  .side-menu {
    display: grid;
    grid-template-rows: 96px 1fr min-content;

    border-left: 1px solid var(--palette-outline-2);
    width: 72px;

    background-color: var(--palette-gray-100);

    transition: all 0.2s ease-in-out;

    z-index: $overlay;

    &--expanded,
    &--hovered {
      width: 300px;

      .nav__item {
        width: 100%;
      }

      .side-menu__content {
        padding: 0 space(4) space(4) space(4);
      }
    }

    &--fixed {
      position: fixed;
      top: 0;
      right: 0;
    }

    &--hovered {
      @include elevation(4);

      width: 300px;
    }

    &__logo {
      @include flex($align: center);
      gap: space(1.5);
    }

    &__header {
      @include flex($justify: space-between);

      padding: space(4);
      margin-bottom: space(6);
      width: 100%;
      border-bottom: 1px solid var(--palette-outline-2);
    }

    &__content {
      margin-top: auto;
      padding: 0 space(1.5) space(4) space(1.5);
      width: 100%;
    }
  }

  .nav {
    @include scrollbar($track-background-color: var(--palette-bg-2));
    @include flex($dir: column);
    gap: space(7);

    padding: 0 space(3) space(3) space(3);

    width: 100%;

    overflow: auto;

    &__group {
      @include flex($dir: column);
      gap: space(1);

      width: 100%;
    }

    &__label {
      @include typography(bold-12);
      color: var(--palette-text-main-4);

      padding: 0 space(3);
    }

    &__icon {
      color: var(--palette-gray-500);

      transition: all 0.3s;
    }
  }

  .link {
    @include typography(medium-14);
    @include flex($align: center);
    gap: space(2);

    width: 100%;
    border-radius: radius(1.5);

    color: var(--palette-text-main-2);

    padding: space(2) space(3);
    user-select: none;
    cursor: pointer;

    transition: all 0.3s;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      right: -12px;
      transform: translateY(-50%);

      width: 6px;
      height: 32px;
      border-radius: radius(0.5) 0 0 radius(0.5);
      background-color: var(--palette-primary);
      opacity: 0;

      transition: all 0.3s ease-in-out;
    }

    &__badge {
      @include typography(bold-12);
      @include flex($align: center, $justify: center);

      background-color: var(--palette-status-danger);
      color: var(--palette-text-light);
      border-radius: radius(1);

      width: 24px;
      height: 24px;
    }

    &__action {
      @include flex();

      margin-right: auto;
    }

    &:hover {
      background-color: var(--palette-bg-3);
    }

    &--inner {
      @include typography(regular-14);
      padding: space(2) space(11);
    }

    &--open {
      color: var(--palette-primary);

      .nav__icon {
        color: var(--palette-primary);

        &:last-child {
          transform: rotate(180deg);
        }
      }
    }

    &--active {
      @include typography(bold-14);

      .nav__icon,
      & {
        color: var(--palette-primary);
      }

      &:not(.link--open) {
        background-color: var(--palette-primary-light);
        position: relative;

        &:before {
          opacity: 1;
        }
      }
    }
  }
</style>
