<template>
  <div>
    <section class="mb-12">
      <div class="bg-emerald-50 rounded-lg p-8 mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ $t('home.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('home.description') }}</p>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>

      <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg">
        {{ error }}
      </div>

      <div v-else>
        <div v-if="filteredProducts.length === 0" class="text-center py-12">
          <p class="text-xl text-gray-600">No products found.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useProductStore } from '@/stores/products';
import ProductCard from '@/components/ProductCard.vue';

const productStore = useProductStore();

const loading = computed(() => productStore.loading);
const error = computed(() => productStore.error);
const filteredProducts = computed(() => productStore.filteredProducts);

const fetched = ref(false);

onMounted(() => {
  if (!fetched.value) {
    productStore.fetchProducts();
    fetched.value = true;
  }
});
</script>