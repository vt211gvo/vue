<template>
  <div id="app" class="font-sans text-gray-800 p-8">
    <nav class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-semibold text-green-500">My App</h1>
      <ul class="flex gap-4">
        <li v-if="!isAuthenticated">
          <router-link to="/login"
            class="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition">
            Login
          </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link to="/register"
            class="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition">
            Register
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <button @click="logout"
            class="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition">
            Logout
          </button>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  name: 'App',
  setup() {
    const isAuthenticated = ref(false);
    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isAuthenticated.value = !!user;
      });
    });

    const logout = async () => {
      try {
        await signOut(auth);
        isAuthenticated.value = false;
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped></style>
