<template>
  <header class="bg-emerald-600 text-white shadow-md">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <router-link :to="{ name: 'home' }" class="text-2xl font-bold">
          {{ storeName }}
        </router-link>

        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
                type="text"
                :placeholder="$t('navbar.search')"
                v-model="searchQuery"
                @input="handleSearch"
                class="px-4 py-2 rounded-full text-gray-800 w-64"
            />
          </div>

          <LanguageSwitcher />

          <nav class="flex items-center space-x-6">
            <router-link :to="{ name: 'home' }" class="hover:underline">
              {{ $t('navbar.home') }}
            </router-link>

            <router-link :to="{ name: 'cart' }" class="hover:underline relative">
              {{ $t('navbar.cart') }}
              <span
                  v-if="cartCount > 0"
                  class="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartCount }}
              </span>
            </router-link>

            <template v-if="isAuthenticated">
              <button @click="handleLogout" class="hover:underline">
                {{ $t('navbar.logout') }}
              </button>
            </template>
            <template v-else>
              <router-link :to="{ name: 'login' }" class="hover:underline">
                {{ $t('navbar.login') }}
              </router-link>
            </template>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';
import { useProductStore } from '@/stores/products';
import LanguageSwitcher from './LanguageSwitcher.vue';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const cartStore = useCartStore();
const productStore = useProductStore();

const storeName = computed(() => {
  return t('home.title').split(' ')[0];
});

const isAuthenticated = computed(() => userStore.isAuthenticated);
const cartCount = computed(() => cartStore.totalItems);

const searchQuery = ref('');

const handleSearch = () => {
  productStore.setSearchQuery(searchQuery.value);
};

const handleLogout = async () => {
  await userStore.logout();
  await router.push({name: 'home'});
};

watch(() => router.currentRoute.value.path, () => {
  searchQuery.value = '';
  productStore.setSearchQuery('');
});
</script>