<template>
  <div class="image-uploader">
    <base-avatar
      :src="imageSrc"
      :alt="props.alt"
      :loading="props.loading"
      size="md"
      icon="edit"
      @click:icon="openFilePicker"
    />

    <input
      type="file"
      ref="inputElement"
      accept="image/*"
      @change="setFile($event.target.files[0])"
      class="image-uploader__input"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: [Object, null],
      required: true,
    },
    alt: String,
    loading: Boolean,
  });

  const emit = defineEmits(["update:modelValue"]);

  const selectedFile = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  const imageSrc = computed(() => selectedFile.value && URL.createObjectURL(selectedFile.value));

  const inputElement = ref(null);
  const openFilePicker = () => inputElement.value.click();
  const setFile = (value) => (selectedFile.value = value);
</script>

<style lang="scss" scoped>
  .image-uploader {
    &__input {
      display: none;
    }
  }
</style>
