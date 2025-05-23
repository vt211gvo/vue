<template>
    <div class="max-w-md mx-auto p-6 border rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Register</h2>
        <form @submit.prevent="register" class="space-y-4">
            <div class="form-group">
                <label for="email" class="block mb-1 font-medium">Email</label>
                <input type="email" id="email" v-model="email" required placeholder="Enter your email"
                    class="w-full p-2 border rounded" />
            </div>
            <div class="form-group">
                <label for="password" class="block mb-1 font-medium">Password</label>
                <input type="password" id="password" v-model="password" required placeholder="Enter your password"
                    class="w-full p-2 border rounded" />
            </div>
            <button :disabled="loading" type="submit"
                class="w-full py-2 bg-blue-500 text-white rounded disabled:bg-gray-400">
                {{ loading ? 'Registering...' : 'Register' }}
            </button>
        </form>
        <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
    name: 'Register',
    setup() {
        const email = ref('');
        const password = ref('');
        const loading = ref(false);
        const errorMessage = ref('');
        const router = useRouter();

        const register = async () => {
            loading.value = true;
            errorMessage.value = '';

            try {
                const auth = getAuth();
                await createUserWithEmailAndPassword(auth, email.value, password.value);
                router.push('/items');
            } catch (error) {
                errorMessage.value = error.message;
            } finally {
                loading.value = false;
            }
        };

        return {
            email,
            password,
            loading,
            errorMessage,
            register,
        };
    },
};
</script>

<style scoped></style>