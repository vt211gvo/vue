import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { login as apiLogin, logout as apiLogout } from '../services/AuthService';

export const useUserStore = defineStore('user', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null);
    const loading = ref(false);
    const error = ref(null);

    const isAuthenticated = computed(() => !!user.value);

    async function login(credentials) {
        loading.value = true;
        error.value = null;

        try {
            const userData = await apiLogin(credentials);
            user.value = userData;
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        } catch (err) {
            error.value = err.message || 'Login failed';
            console.error(err);
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function logout() {
        try {
            await apiLogout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            user.value = null;
            localStorage.removeItem('user');
        }
    }

    return {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout
    };
});