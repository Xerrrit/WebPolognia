<script setup>
import { ref, onMounted } from 'vue';
import api from '../api/axios';
import { authStore } from '../store/auth';

const products = ref([]);
const loading = ref(true);
const error = ref('');

const getImageUrl = (image) => {
  if (!image) return '/placeholder.png'; 
  return image.startsWith('http') ? image : `http://localhost:4000${image}`;
};

async function fetchProducts() {
  try {
    const response = await api.get('/products');
    products.value = response.data;
  } catch (err) {
    error.value = "Failed to load products.";
    console.error(err);
  } finally {
    loading.value = false;
  }
}


async function deleteProduct(id) {
  if(!confirm("Are you sure you want to delete this product?")) return;
  
  try {
    await api.delete(`/products/${id}`);
    
    products.value = products.value.filter(p => p.id !== id);
  } catch (err) {
    alert("Failed to delete product");
    console.error(err);
  }
}

function editProduct(id) {
  alert(`Edit product ${id}\n(Feature to be implemented in Admin Panel)`);
}

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="products-page">
    <h1>Our Products</h1>

    <div v-if="loading" class="loading">Loading products...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
            <span class="placeholder-img">{{ product.name.charAt(0) }}</span>
            
        </div>
        
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="description">{{ product.description || 'No description available' }}</p>
          <div class="price-row">
            <span class="price">${{ product.price }}</span>
            <span v-if="product.stock > 0" class="stock">In Stock</span>
            <span v-else class="out-of-stock">Out of Stock</span>
          </div>
        </div>

        <div v-if="authStore.isAdmin()" class="admin-controls">
           <button @click="editProduct(product.id)" class="edit-btn">Edit</button>
           <button @click="deleteProduct(product.id)" class="delete-btn">Delete</button>
        </div>
        <div v-else class="user-controls">
             <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

