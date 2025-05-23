<template>
  <div>
    <div v-if="!product" class="text-center py-12">
      <div v-if="loading" class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
      <p v-else class="text-xl text-gray-600">Product not found</p>
    </div>

    <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="md:flex">
        <div class="md:w-1/2 p-8">
          <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-auto object-contain"
          />
        </div>

        <div class="md:w-1/2 p-8">
          <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
          <p class="text-gray-600 mb-6">{{ product.description }}</p>

          <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">{{ $t('product.price') }}</h2>
            <p class="text-2xl font-bold">${{ product.price }}</p>
          </div>

          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <button
                  @click="decreaseQuantity"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                  :disabled="quantity <= 1"
              >
                -
              </button>

              <span class="w-10 text-center text-xl">{{ quantity }}</span>

              <button
                  @click="increaseQuantity"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
              >
                +
              </button>
            </div>

            <button
                @click="addToCart"
                class="btn btn-primary"
            >
              {{ $t('product.add_to_cart') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const loading = ref(true);
const quantity = ref(1);
const initialFetch = ref(false);

const product = computed(() => {
  return productStore.getProductById(route.params.id);
});

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value);
  }
};

onMounted(async () => {
  if (!initialFetch.value) {
    await productStore.fetchProducts();
    initialFetch.value = true;
  }
  loading.value = false;
});
</script>