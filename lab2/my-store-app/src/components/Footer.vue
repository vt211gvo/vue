<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">{{ storeName }}</h3>
          <p class="text-gray-300">
            {{ new Date().getFullYear() }} &copy; {{ $t('footer.rights') }}
          </p>
        </div>

        <div>
          <h3 class="text-xl font-bold mb-4">{{ $t('footer.about') }}</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-300 hover:text-white">{{ $t('footer.about') }}</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white">{{ $t('footer.contact') }}</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-bold mb-4">{{ $t('footer.contact') }}</h3>
          <address class="text-gray-300 not-italic">
            <p>Email: info@example.com</p>
            <p>Tel: +123 456 7890</p>
          </address>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const storeName = computed(() => {
  return t('home.title').split(' ')[0];
});
</script>