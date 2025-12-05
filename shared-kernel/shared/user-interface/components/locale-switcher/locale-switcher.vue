<script setup>
import { onMounted } from 'vue'
import { useLocale } from "@user-interface/shared/composables/useLocale";

const { locale, toggleLocale, setLocaleAll } = useLocale()

onMounted(() => {
    const saved = localStorage.getItem('app_locale')
    if (saved && saved !== locale.value) setLocaleAll(saved)
})
</script>

<template>
    <div class="lang-switcher" :class="[locale]" @click="toggleLocale">
        <span class="lang-switcher__item" :class="{ active: locale === 'fa' }">فا</span>
        <span class="lang-switcher__item" :class="{ active: locale === 'en' }">EN</span>
    </div>
</template>

<style lang="scss">
.lang-switcher {
    // width: 76px;
    // height: 32px;
    direction: ltr;
    background-color: #EDF0F5;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    padding: 4px;
    transition: all 0.5s;

    &__item {
        z-index: 2;
        width: var(--item-width , 32px);
        height: var(--item-height , 24px);
        @include flex($align: center, $justify: center);
        @include typography(regular-12);

        &.active {
            @include typography(bold-12);

        }
    }

    &::before {
        content: '';
        width: var(--item-width , 32px);
        height: var(--item-height , 24px);
        background-color: white;
        position: absolute;
        z-index: 1;
        top: 4px;
        // left: 4px;
        border-radius: 4px;
        box-shadow: 0px 2px 8px 0px #00000026;
        transition: right 0.5s;

    }

    &.en {
        @include typography(bold-12);

        &::before {
            right: 4%;
        }
    }

    &.fa {
        @include typography(bold-12);

        &::before {
            // right: 4px;
            // left: 5px;
            right: 54%;
        }
    }
}
</style>