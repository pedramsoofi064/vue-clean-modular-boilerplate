<template>
  <text-field :append-icon :type @click:append="togglePassword" />
</template>

<script setup>
  const type = ref("password");
  const appendIcon = computed(() => (type.value === "password" ? "eye" : "eye-cross"));

  const togglePassword = () => (type.value = type.value === "password" ? "text" : "password");
</script>
