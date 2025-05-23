import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getProducts } from '../api/products';

export const useProductStore = defineStore('products', () => {
    const products = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const searchQuery = ref('');

    const filteredProducts = computed(() => {
        if (!searchQuery.value) return products.value;

        return products.value.filter(product =>
            product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });

    async function fetchProducts() {
        loading.value = true;
        error.value = null;

        try {
            products.value = await getProducts();
        } catch (err) {
            error.value = err.message || 'Failed to fetch products';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    function getProductById(id) {
        return products.value.find(product => product.id === parseInt(id));
    }

    function setSearchQuery(query) {
        searchQuery.value = query;
    }

    return {
        products,
        loading,
        error,
        searchQuery,
        filteredProducts,
        fetchProducts,
        getProductById,
        setSearchQuery
    };
});