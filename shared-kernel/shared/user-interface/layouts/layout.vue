<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
  const route = useRoute();
  const layoutName = ref("default");

  const layout = computed(() => {
    const name = layoutName.value;

    return defineAsyncComponent(() => import(`@user-interface/shared/layouts/${name}.layout.vue`));
  });

  watch(
    () => route.meta.layout,
    () => (layoutName.value = route.meta?.layout ?? "default"),
    { immediate: true },
  );
</script>
