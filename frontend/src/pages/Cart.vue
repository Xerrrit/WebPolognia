<template>
  <div class="cart-wrapper">

    <div v-if="cartStore.loading">
      <p>Loading...</p>
    </div>

    <div v-else-if="cartStore.items.length === 0">
      <p>Empty cart.</p>
    </div>

    <div v-else class="cart-content">
      <div 
        v-for="item in cartStore.items" 
        :key="item.id" 
        class="cart-item"
      >
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>Quantité : {{ item.quantity }}</p>
          <p>Prix : {{ item.price }} €</p>
        </div>

        <button 
          class="remove-btn"
          @click="cartStore.removeItem(item.id)"
        >
          Delete
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.fetchCart();
});
</script>

<style scoped>
.cart-wrapper {
  padding: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.remove-btn {
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.remove-btn:hover {
  background-color: #c9302c;
}
</style>
