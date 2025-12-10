<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api/axios';
import { useCartStore } from '../store/cart';

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const error = ref('');
const cartStore = useCartStore();
const productId = route.params.id;

async function fetchProductDetails() {
    try {
        const response = await api.get(`/products/${productId}`);
        product.value = response.data;
    } catch (err) {
        error.value = "Failed to load product details.";
        console.error("Error fetching product details:", err);
    } finally {
        loading.value = false;
    }
}

function addToCartHandler() {
    if (product.value) {
        cartStore.addToCart(product.value.id);
    }
}

onMounted(() => {
    fetchProductDetails();
});
</script>

<template>
    <div class="product-detail-page">
        <h1>Product Detail</h1>

        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        
        <div v-else-if="product" class="product-container">
            
            <div class="product-image">
                <img 
                    v-if="product.image" 
                    :src="product.image" 
                    :alt="product.name" 
                    style="max-width: 300px; height: auto;"
                />
                <div v-else style="border: 1px solid #ccc; padding: 20px;">
                    No Image Available
                </div>
            </div>

            <div class="product-info">
                <h2>{{ product.name }}</h2>
                <p><strong>Price:</strong> ${{ product.price }}</p>
                <p><strong>Details:</strong> {{ product.description || 'No description available.' }}</p>
                
                <p>
                    <span v-if="product.stock > 0" style="color: green;">In Stock</span>
                    <span v-else style="color: red;">Out of Stock</span>
                </p>


                <p style="margin-top: 20px;">
                    <button class="back-button" @click="$router.go(-1)">
                        ← Back to Previous Page
                    </button>
                </p>
            </div>
        </div>
        
        <div v-else>
            Product details are not available.
        </div>
    </div>
</template>

<style scoped>
.product-container {
    display: flex;
    gap: 30px;
    align-items: flex-start;
}

.error {
    color: red;
    font-weight: bold;
}

.back-button {
    background: none; 
    border: none; 
    padding: 0;
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    font-size: 1em; 
    text-align: left;
    display: block;
    color: cyan;
}
</style>    