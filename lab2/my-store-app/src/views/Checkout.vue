<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">{{ $t('checkout.title') }}</h1>

    <div v-if="orderPlaced" class="bg-green-100 text-green-700 p-6 rounded-lg mb-8">
      <h2 class="text-xl font-bold mb-2">{{ $t('checkout.success') }}</h2>
      <p>Thank you for your order!</p>
      <router-link :to="{ name: 'home' }" class="btn btn-primary mt-4">
        {{ $t('navbar.home') }}
      </router-link>
    </div>

    <div v-else-if="cartItems.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
      <p class="text-xl text-gray-600 mb-6">{{ $t('cart.empty') }}</p>
      <router-link :to="{ name: 'home' }" class="btn btn-primary">
        {{ $t('navbar.home') }}
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-bold mb-4">{{ $t('checkout.address') }}</h2>

          <form @submit.prevent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 mb-1">First Name</label>
                <input type="text" class="w-full p-2 border rounded" v-model="form.firstName" />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">Last Name</label>
                <input type="text" class="w-full p-2 border rounded" v-model="form.lastName" />
              </div>
            </div>

            <div>
              <label class="block text-gray-700 mb-1">Address</label>
              <input type="text" class="w-full p-2 border rounded" v-model="form.address" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-gray-700 mb-1">City</label>
                <input type="text" class="w-full p-2 border rounded" v-model="form.city" />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">Postal Code</label>
                <input type="text" class="w-full p-2 border rounded" v-model="form.postalCode" />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">Country</label>
                <select class="w-full p-2 border rounded" v-model="form.country">
                  <option value="Ukraine">Ukraine</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">{{ $t('checkout.payment') }}</h2>

          <form @submit.prevent class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-1">Card Number</label>
              <input type="text" class="w-full p-2 border rounded" v-model="form.cardNumber" placeholder="**** **** **** ****" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 mb-1">Expiry Date</label>
                <input type="text" class="w-full p-2 border rounded" v-model="form.expiryDate" placeholder="MM/YY" />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">CVV</label>
                <input type="text" class="w-full p-2 border rounded" v-model="form.cvv" placeholder="***" />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="md:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>

          <div class="space-y-4 mb-6">
            <div v-for="item in cartItems" :key="item.id" class="flex justify-between">
              <div>
                <span class="font-medium">{{ item.title }}</span>
                <span class="text-gray-600 text-sm"> x{{ item.quantity }}</span>
              </div>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>

          <div class="border-t pt-4 mb-6">
            <div class="flex justify-between font-bold text-lg">
              <span>{{ $t('cart.total') }}</span>
              <span>${{ totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <button
              @click="placeOrder"
              class="btn btn-primary w-full"
              :disabled="!formIsValid"
          >
            {{ $t('checkout.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const orderPlaced = ref(false);
const showSuccessMessage = ref(false);

const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

const form = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'Ukraine',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
});

const formIsValid = computed(() => {
  return form.value.firstName &&
      form.value.lastName &&
      form.value.address &&
      form.value.city &&
      form.value.postalCode &&
      form.value.country &&
      form.value.cardNumber &&
      form.value.expiryDate &&
      form.value.cvv;
});

const placeOrder = () => {
  setTimeout(() => {
    showSuccessMessage.value = true;
    cartStore.clearCart();
  }, 1000);
};

onMounted(() => {
  orderPlaced.value = false;
});
</script>