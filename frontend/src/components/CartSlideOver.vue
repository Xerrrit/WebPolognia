<script setup>
import { useCart } from "../composables/useCart";
import api from "../api/axios";
import { computed } from "vue";

const { cart, loading, visible, closeCart, removeItem, fetchCart } = useCart();

// Add +1 quantity
async function increaseQuantity(item) {
  try {
    console.log("Increase +1 for item:", item);

    await api.post("/cart/add", {
      product_id: item.product_id,  //
      quantity: 1
    });

    await fetchCart(); 

    alert(`+1 "${item.name}" added to your cart`);
  } catch (err) {
  }
}


// Calculate total
const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
);
</script>

<template>
  <div 
    v-if="visible" 
    class="overlay"
    @click.self="closeCart"
  ></div>

  <div class="slider" :class="{ open: visible }">

    <!-- HEADER -->
    <div class="header">
      <h2>Your Cart</h2>
      <button @click="closeCart" class="close-btn">✖</button>
    </div>

    <!-- MAIN CONTENT (scrollable) -->
    <div class="content-area">

      <!-- LOADING -->
      <div v-if="loading" class="loading">Loading...</div>

      <!-- EMPTY CART -->
      <div v-else-if="cart.length === 0" class="empty">
        🛒 Your cart is empty
      </div>

      <!-- ITEMS LIST -->
      <div v-else class="items-list">
        <div v-for="item in cart" :key="item.id" class="cart-item">

          <!-- IMAGE -->
          <div class="item-image">
            <span>{{ item.name.charAt(0) }}</span>
          </div>

          <!-- DETAILS -->
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <div class="sub-info">Brand new</div>
            <div class="availability"><span class="dot"></span> Available</div>

            <div class="actions">
              <div class="qty-display">{{ item.quantity }}</div>

              <button class="plus-btn" @click="increaseQuantity(item)">+</button>

              <button class="trash" @click="removeItem(item.id)">
                🗑️
              </button>
            </div>
          </div>

          <!-- PRICE -->
          <div class="price">{{ item.price }} €</div>
        </div>
      </div>

    </div>

    <!-- FOOTER (always visible) -->
    <div class="footer-total">
      <div class="total-line">
        <span>Total:</span>
        <span>{{ total }} €</span>
      </div>

      <button class="checkout-btn">Order (Not implemented)</button>
    </div>

  </div>
</template>

<style scoped>
/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(2px);
  z-index: 30;
}

/* Slider container */
.slider {
  position: fixed;
  right: 0;
  top: 0;
  width: 340px;
  height: 100%;
  background: #F9F7F2;
  color: #1A1A1A;
  box-shadow: -3px 0 10px rgba(0,0,0,0.25);
  transform: translateX(100%);
  transition: transform 0.25s ease-out;
  z-index: 50;

  /* FIX: use flex column so footer is separated */
  display: flex;
  flex-direction: column;
}

.slider.open {
  transform: translateX(0);
}

/* Header */
.header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: #3A3333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  padding: 6px 10px;
  cursor: pointer;
}

/* MAIN SCROLL AREA */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
}

/* Empty state */
.empty {
  font-size: 1.1rem;
  opacity: 0.7;
  margin-top: 20px;
}

/* Items list */
.items-list {
  padding-bottom: 20px;
}

/* Cart item */
.cart-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #E6DCD0;
}

/* Image placeholder */
.item-image {
  width: 60px;
  height: 60px;
  background: #EFE4D9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
}

/* Details */
.item-details h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.sub-info {
  font-size: 0.8rem;
  opacity: 0.6;
}

.availability {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #2ecc71;
  border-radius: 50%;
}

/* Quantity + buttons */
.actions {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-display {
  background: #EFE4D9;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: bold;
}

.plus-btn {
  background: #C7A987;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
}

.plus-btn:hover {
  background: #B39373;
}

.trash {
  background: #E8D7C9;
  padding: 6px 7px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}
.trash:hover {
  background: #D8C1AD;
}

/* Price */
.price {
  font-size: 1.05rem;
  font-weight: bold;
  align-self: center;
}

/* FOOTER */
.footer-total {
  background: #F2E8DA;
  border-top: 1px solid #E0D3C2;
  padding: 15px 20px;
  width: 90%;          /* IMPORTANT */
}

.total-line {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 12px;
}

.checkout-btn {
  width: 100%;
  background: #C7A987;
  border: none;
  padding: 10px 0;
  border-radius: 6px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
}

.checkout-btn:hover {
  background: #B39373;
}
</style>

