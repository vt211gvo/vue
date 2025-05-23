<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-8">{{ $t('login.title') }}</h1>

    <div class="bg-white rounded-lg shadow-md p-8">
      <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-gray-700 mb-2">{{ $t('login.email') }}</label>
          <input
              type="email"
              v-model="email"
              class="w-full p-3 border rounded"
              required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-2">{{ $t('login.password') }}</label>
          <input
              type="password"
              v-model="password"
              class="w-full p-3 border rounded"
              required
          />
        </div>

        <div>
          <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="loading"
          >
            <span v-if="loading" class="inline-block animate-spin mr-2">⟳</span>
            {{ $t('login.login_button') }}
          </button>
        </div>
      </form>

      <div class="mt-6 text-center text-gray-600">
        <p>Demo credentials: user@example.com / password</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const email = ref('');
const password = ref('');

const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);

const handleLogin = async () => {
  const success = await userStore.login({
    email: email.value,
    password: password.value
  });

  if (success) {
    const redirectPath = route.query.redirect || '/';
    router.push(redirectPath);
  }
};
</script>