<template>
  <div class="file-picker-wrapper">
    <span v-if="props.label">{{ props.label }}</span>
    <label :class="filePickerClasses" :for="props.name"
      @drop.prevent.stop="(event) => setFile(event.dataTransfer.files[0])" @dragover.prevent.stop
      @dragenter="setIsDragging(true)" @dragleave="setIsDragging(false)" v-if="!props.simple">
      <div v-if="selectedFile || props.loading" class="file-picker__preview preview" v-skeleton="props.loading">
        <a :href="fileInfo.url" download :alt="props.label || props.validationLabel">
          <svg-loader name="uploaded" />
        </a>

        <div class="preview__info">
          <span class="file-picker__title">{{ fileInfo?.name }}</span>

          <span class="file-picker__subtitle">{{ fileInfo?.size }}</span>
        </div>

        <svg-loader name="trash" @click.stop.prevent="deleteFile" class="preview__delete" />
      </div>

      <div v-else class="file-picker__upload">
        <p class="file-picker__title"> {{ description }}</p>
        <svg-loader name="upload" />
      </div>
    </label>

    <base-button variant="outlined" :label="simpleLabel" @click="openFilePicker" :loading="props.loading" v-else />

    <input type="file" :id="props.name" class="file-picker__input" ref="fileInputElement"
      @change="(event) => setFile(event.target.files[0])" />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [Object, null],
    required: true,
  },
  maxSize: {
    type: String,
    default: "3 MB",
  },
  accept: {
    type: String,
    default: "image/*",
  },
  label: String,
  description: String,
  validationLabel: {
    type: String,
    default: (props) => props.label,
  },
  name: {
    type: String,
    default: (props) => props.validationLabel || "فایل",
  },
  rules: {
    type: [Object, String],
    default: "",
  },
  loading: Boolean,
  simple: Boolean,
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

const fileInfo = computed(() => {
  const { name, size } = selectedFile.value || {};
  const url = selectedFile.value ? URL.createObjectURL(selectedFile.value) : "";

  return { name, size: convertBytesToSize(size), url };
});

const fileInputElement = ref(null);

const sizeInKiloBytes = convertSizeToKiloBytes(props.maxSize);
const normalizedRules = isString(props.rules)
  ? props.rules + `|size:${sizeInKiloBytes}|mimes:${props.accept}`
  : { ...props.rules, size: sizeInKiloBytes, mimes: props.accept };

const fieldOptions = { label: props.validationLabel, initialValue: props.modelValue };
const { value: fieldValue, validate } = useField(props.name, normalizedRules, fieldOptions);

const deleteFile = () => {
  fileInputElement.value.value = "";
  selectedFile.value = null;
};

const errorMessage = ref("");
const message = computed(() => errorMessage.value || `حداکثر حجم فایل ${props.maxSize}`);

const validateFile = async (file) => {
  fieldValue.value = file;
  const { valid, errors } = await validate();

  errorMessage.value = errors?.[0];
  if (!valid) deleteFile();

  return valid;
};
const setFile = async (value) => {
  const isValid = await validateFile(value);
  if (isValid) selectedFile.value = value;

  setIsDragging(false);
};

const isDragging = ref(false);
const setIsDragging = (value) => (isDragging.value = value);

const filePickerClasses = useClassModifier(
  "file-picker",
  computed(() => ({
    "has-error": errorMessage.value,
    dragged: isDragging.value,
  })),
);

watch(
  () => props.modelValue,
  () => {
    fieldValue.value = props.modelValue;
  },
);

const simpleLabel = computed(() => fileInfo.value?.name || "انتخاب فایل");

const openFilePicker = () => fileInputElement.value.click();
</script>

<style lang="scss" scoped>
.file-picker-wrapper {
  @include typography(regular-14);
  @include flex($dir: column);
  gap: space(1);

  width: 100%;

  color: var(--palette-text-main-3);
}

.file-picker {
  width: 100%;
  height: 48px;
  border-radius: radius(1);
  // border: 1px solid var(--palette-outline-3);
  background-color: var(--palette-primary-light);
  transition: all 0.3s;
  user-select: none;
  cursor: pointer;

  overflow: hidden;

  &--has-error {
    border-color: var(--palette-status-danger);

    .file-picker__subtitle {
      color: var(--palette-status-danger);
    }
  }

  &--dragged {
    border-color: var(--palette-primary);
  }

  &__preview,
  &__upload {
    width: 100%;
    height: 100%;
  }

  &__upload {
    @include flex($align: center, $justify: center);
    gap: space(2);
    padding: space(3);
    position: relative;

    >* {
      z-index: 1;
    }
  }

  &__background {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &__title,
  &__subtitle {
    @include typography(bold-16);
  }

  &__title {
    color: var(--palette-primary);

    span {
      @include typography(medium-14);
      color: var(--palette-primary);
    }
  }

  &__subtitle {
    color: var(--palette-text-main-3);
  }

  &__input {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
}

.preview {
  @include flex($align: center, $justify: center);
  gap: space(2);

  padding: space(6) space(3);

  >* {
    border-radius: radius(2);
  }

  &__info {
    @include flex($dir: column, $justify: center);
    gap: space(1);
  }

  &__delete {
    margin-right: auto;
  }
}
</style>
