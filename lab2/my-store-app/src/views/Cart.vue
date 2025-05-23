<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">{{ $t('cart.title') }}</h1>

    <div v-if="cartItems.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
      <p class="text-xl text-gray-600 mb-6">{{ $t('cart.empty') }}</p>
      <router-link :to="{ name: 'home' }" class="btn btn-primary">
        {{ $t('navbar.home') }}
      </router-link>
    </div>

    <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <div class="mb-4 pb-4 border-b flex font-semibold text-gray-600">
          <div class="flex-grow">{{ $t('product.details') }}</div>
          <div class="w-32 text-center">Quantity</div>
          <div class="w-24 text-right">Total</div>
          <div class="w-20"></div>
        </div>

        <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
        />

        <div class="mt-8 flex justify-between items-center">
          <button
              @click="clearCart"
              class="text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>

          <div class="text-right">
            <div class="text-lg mb-2">
              {{ $t('cart.total') }}: <span class="font-bold">${{ totalPrice.toFixed(2) }}</span>
            </div>

            <router-link
                :to="{ name: 'checkout' }"
                class="btn btn-primary"
            >
              {{ $t('cart.checkout') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useCartStore} from '@/stores/cart';
import CartItem from '@/components/CartItem.vue';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

const clearCart = () => {
  cartStore.clearCart();
};
</script>