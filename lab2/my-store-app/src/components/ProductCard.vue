<template>
  <div class="card h-full flex flex-col">
    <div class="p-4 flex-grow">
      <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-48 object-contain mb-4"
          loading="lazy"
      />
      <h3 class="text-lg font-semibold mb-2">{{ product.title }}</h3>
      <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
      <div class="flex justify-between items-center mt-auto">
        <span class="text-lg font-bold">${{ product.price }}</span>
        <div class="flex space-x-2">
          <router-link
              :to="{ name: 'product-detail', params: { id: product.id } }"
              class="btn btn-secondary text-sm"
          >
            {{ $t('product.details') }}
          </router-link>
          <button
              @click="addToCart"
              class="btn btn-primary text-sm"
          >
            {{ $t('product.add_to_cart') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { onMounted } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();

const addToCart = () => {
  cartStore.addToCart(props.product);
};

onMounted(() => {
});
</script>