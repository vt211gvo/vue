<template>
  <div class="flex items-center py-4 border-b">
    <img
        :src="item.image"
        :alt="item.title"
        class="w-20 h-20 object-contain mr-4"
    />

    <div class="flex-grow">
      <h3 class="font-medium">{{ item.title }}</h3>
      <p class="text-gray-600">${{ item.price }}</p>
    </div>

    <div class="flex items-center space-x-2">
      <button
          @click="decreaseQuantity"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
          :disabled="item.quantity <= 1"
      >
        -
      </button>

      <span class="w-8 text-center">{{ item.quantity }}</span>

      <button
          @click="increaseQuantity"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
      >
        +
      </button>
    </div>

    <div class="ml-6 w-24 text-right">
      ${{ (item.price * item.quantity).toFixed(2) }}
    </div>

    <button
        @click="removeItem"
        class="ml-4 text-red-500 hover:text-red-700"
        aria-label="Remove item"
    >
      {{ $t('cart.remove') }}
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();

const increaseQuantity = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity + 1);
};

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    cartStore.updateQuantity(props.item.id, props.item.quantity - 1);
  }
};

const removeItem = () => {
  cartStore.removeFromCart(props.item.id);
};
</script>