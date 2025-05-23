<template>
    <div v-if="isAuthenticated" class="max-w-xl mx-auto p-6 border rounded-lg shadow-lg">
        <h1 class="text-3xl font-semibold mb-6">Items</h1>
        <ul class="space-y-2">
            <li v-for="item in items" :key="item.id" class="flex justify-between items-center p-2 border rounded">
                {{ item.name }}
                <div class="space-x-2">
                    <button @click="editItem(item)"
                        class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition">
                        Edit
                    </button>
                    <button @click="deleteItem(item.id)"
                        class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition">
                        Delete
                    </button>
                </div>
            </li>
        </ul>
        <div class="mt-6">
            <h2 class="text-2xl font-semibold mb-4">{{ editMode ? 'Edit Item' : 'Add New Item' }}</h2>
            <input v-model="itemName" placeholder="Item Name" class="w-full p-2 border rounded mb-2" />
            <button @click="editMode ? updateItem() : addItem()" class="w-full py-2 bg-green-500 text-white rounded">
                Submit
            </button>
        </div>
    </div>
    <div v-else>
        <p class="text-center text-gray-500">You need to log in to view and manage items.</p>
    </div>
</template>

<script>
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    data() {
        return {
            items: [],
            itemName: '',
            editMode: false,
            editItemId: null,
            isAuthenticated: false,
            authToken: null,
        };
    },
    created() {
        this.checkAuthentication();
    },
    methods: {
        checkAuthentication() {
            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    this.isAuthenticated = true;
                    this.authToken = await user.getIdToken();
                    this.fetchItems();
                } else {
                    this.isAuthenticated = false;
                    this.authToken = null;
                }
            });
        },

        async fetchItems() {
            try {
                const response = await axios.get(`https://lab4-64f30-default-rtdb.firebaseio.com/items/${id}.json?auth=${this.authToken}`);
                this.items = response.data ? Object.keys(response.data).map(id => ({ id, ...response.data[id] })) : [];
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },

        async addItem() {
            if (!this.itemName) return;
            const newItem = { name: this.itemName };

            try {
                const response = await axios.post(`https://lab4-64f30-default-rtdb.firebaseio.com/items/${id}.json?auth=${this.authToken}`, newItem);
                this.items.push({ id: response.data.name, ...newItem });
                this.itemName = '';
            } catch (error) {
                console.error('Error adding item:', error);
            }
        },

        async updateItem() {
            if (!this.itemName || !this.editItemId) return;
            const updatedItem = { name: this.itemName };

            try {
                await axios.put(`https://lab4-64f30-default-rtdb.firebaseio.com/items/${id}.json?auth=${this.authToken}`, updatedItem);
                const itemIndex = this.items.findIndex(item => item.id === this.editItemId);
                this.items[itemIndex].name = this.itemName;
                this.clearEditMode();
            } catch (error) {
                console.error('Error updating item:', error);
            }
        },

        async deleteItem(id) {
            try {
                await axios.delete(`https://lab4-64f30-default-rtdb.firebaseio.com/items/${id}.json?auth=${this.authToken}`);
                this.items = this.items.filter(item => item.id !== id);
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        },

        editItem(item) {
            this.editMode = true;
            this.editItemId = item.id;
            this.itemName = item.name;
        },

        clearEditMode() {
            this.editMode = false;
            this.editItemId = null;
            this.itemName = '';
        }
    }
};
</script>

<style scoped></style>