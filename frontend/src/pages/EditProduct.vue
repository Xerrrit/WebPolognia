<template>
  <div class="edit-product">
    <h1>Edit the product</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <form v-else @submit.prevent="updateProduct">

      <!-- Nom -->
      <div class="form-group">
        <label for="name">Name of the product</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>

      <!-- Prix -->
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" id="price" v-model="product.price" required />
      </div>

      <!-- Image -->
      <div class="form-group">
        <label for="image">Image (URL)</label>
        <input type="text" id="image" v-model="product.image" required />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="product.description" required></textarea>
      </div>

      <!-- Stock -->
      <div class="form-group">
        <label for="stock">Stock</label>
        <input type="number" id="stock" v-model="product.stock" required />
      </div>

      <!-- Submit -->
      <button type="submit">Update</button>
    </form>

    <button class="back-btn" @click="$router.go(-1)">Back</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api/axios";
import { authStore } from "../store/auth";

const route = useRoute();
const router = useRouter();

const productId = route.params.id;

const product = ref({
  name: "",
  price: 0,
  image: "",
  description: "",
  stock: 0
});

const loading = ref(true);
const error = ref("");

async function loadProduct() {
  try {
    const response = await api.get(`/products/${productId}`);
    product.value = response.data; 
  } catch (err) {
    console.error(err);
    error.value = "Failed to load product.";
  } finally {
    loading.value = false;
  }
}

async function updateProduct() {
  try {
    const token = authStore.token;

    if (!token) {
      alert("You have to be connected");
      return;
    }

    await api.put(
      `/products/${productId}`,
      product.value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    alert("Product up to date");
    router.push("/products");

  } catch (err) {
    console.error(err);
    alert("Error while updating the product");
  }
}

onMounted(() => {
  loadProduct();
});
</script>

<style scoped>
.edit-product {
  max-width: 600px;
  margin: auto;
}

.error {
  color: red;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

button {
  margin-top: 20px;
}

.back-btn {
  margin-top: 20px;
}
</style>
