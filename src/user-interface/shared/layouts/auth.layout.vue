<template>
  <div class="auth-layout">
    <div class="auth-card">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .auth-layout {
    @include flex($align: center, $justify: center);

    height: 100%;
  }

  .auth-card {
    padding: space(6);
    background-color: var(--palette-bg-1);
    border-radius: radius(1.5);

    border: 1px solid var(--palette-outline-2);
  }
</style>
