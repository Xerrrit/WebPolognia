<script setup>
import { ref, onMounted } from 'vue';
import api from '../api/axios';
import { authStore } from '../store/auth';
import { useCartStore } from '../store/cart';

const products = ref([]);
const loading = ref(true);
const error = ref('');
const cartStore = useCartStore();

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

function editProduct(id) {
  
    console.log(`Editing product with ID: ${id}`);
}

async function deleteProduct(id) {
    if (confirm(`Are you sure you want to delete this product ${id}?`)) {
        try {
            await api.delete(`/products/${id}`);
            alert(`Product ${id} deleted successfully (simulated).`);
            fetchProducts();
        } catch (err) {
            error.value = "Failed to delete product";
            console.error(err);
        }
    }
}

async function addToCartHandler(product_id) {
  try {
    const token = authStore.token;

    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    const response = await api.post(
      "/cart/add",
      {
        product_id: product_id,   
        quantity: 1
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Cart response:", response.data);
    alert("Product added to cart!");

  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Could not add product to cart");
  }
}
onMounted(() => {
  fetchProducts();
});
</script>


<template>
  <div class="products-page">
    <div class="banner-container">
        <img src="/banner_patissier.png" alt="Patissier Banner" class="banner-image" />
    </div>
    <h1>Our Products</h1>

    <div v-if="loading" class="loading">Loading products...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
            <img 
                v-if="product.image" 
                :src="product.image" 
                :alt="product.name" 
                class="product-actual-image"
            />
            
            <span v-else class="placeholder-img">{{ product.name.charAt(0) }}</span>
        </div>
        
        <div class="product-info">
          <h3>
        <router-link :to="`/products/${product.id}`" class="product-name-link">
            {{ product.name }}
        </router-link>
        </h3>
          <p class="description">{{ product.description || 'No description available' }}</p>
          <div class="price-row">
            <span class="price">${{ product.price }}</span>
            <span v-if="product.stock > 0" class="stock">In Stock</span>
            <span v-else class="out-of-stock">Out of Stock</span>
          </div>
        </div>

        <div v-if="authStore.isAdmin()" class="admin-controls">
          <router-link :to="`/editProduct/${product.id}`">
          <button class="edit-btn">Edit</button>
          </router-link>
           <button @click="deleteProduct(product.id)" class="delete-btn">Delete</button>
        </div>
        <div v-else class="user-controls">
            <button 
                class="add-to-cart-btn" 
                @click="addToCartHandler(product.id)" 
                :disabled="product.stock === 0" >
                Add to Cart
            </button>          
        </div>
      </div> 
    </div>
  <div v-if="authStore.isAdmin()" class="center-new-product">
     <router-link to="/newProduct">
    <button class="new-product-btn">Add a new product</button>
  </router-link>
  </div>  
  </div>
</template>

<style scoped>
.products-grid {
    display: grid;
    grid-template-columns: 1fr; 
    gap: 2rem;
    padding: 2rem 0;
}

.center-new-product{
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

@media screen and (min-width: 600px) {
    .products-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (min-width: 900px) {
    .products-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media screen and (min-width: 1200px) {
    .products-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.banner-container {
    width: 100%;
    margin-bottom: 2rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.banner-image {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    display: block;
}
</style>