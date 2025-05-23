<template>
  <div class="flex items-center space-x-2">
    <button
        @click="changeLanguage('uk')"
        :class="{ 'font-bold': currentLocale === 'uk' }"
        class="px-2 py-1 rounded hover:bg-gray-100"
    >
      🇺🇦 UA
    </button>
    <span>|</span>
    <button
        @click="changeLanguage('en')"
        :class="{ 'font-bold': currentLocale === 'en' }"
        class="px-2 py-1 rounded hover:bg-gray-100"
    >
      🇬🇧 EN
    </button>
  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import {useI18n} from 'vue-i18n';

const {locale} = useI18n();

const currentLocale = computed(() => locale.value);

const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem('locale', lang);
};
</script>