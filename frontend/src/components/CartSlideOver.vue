<script setup>
import { useCart } from "../composables/useCart";
const { cart, loading, visible, closeCart, removeItem } = useCart();
</script>

<template>
  <div 
    v-if="visible" 
    class="overlay" 
    @click.self="closeCart"
  ></div>

  <div 
    class="slider" 
    :class="{ open: visible }"
  >
    <div class="header">
      <h2>Your Cart</h2>
      <button @click="closeCart" class="close-btn">✖</button>
    </div>

    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-else>
      <div v-if="cart.length === 0" class="empty">
        Your cart is empty.
      </div>

      <div v-for="item in cart" :key="item.id" class="cart-item">
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>Quantity: {{ item.quantity }}</p>
          <p>Price: {{ item.price }} €</p>
        </div>

        <button 
          class="remove-btn"
          @click="removeItem(item.id)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(2px);
  z-index: 30;
}

.slider {
  color: #1A1A1A;
  position: fixed;
  right: 0;
  top: 0;
  width: 320px;
  height: 100%;
  background: #F9F7F2;
  box-shadow: -2px 0 10px rgba(0,0,0,0.2);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  padding: 20px;
  z-index: 50;
}

.slider.open {
  transform: translateX(0);
}

.header {
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 20px;
}

.cart-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.remove-btn {
  background: #e53935;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background: #c62828;
}
</style>
