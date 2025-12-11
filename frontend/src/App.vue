<script setup>
import { authStore } from './store/auth';
import { useRouter } from 'vue-router';
import { useCart } from './composables/useCart';
import CartSlideOver from "./components/CartSlideOver.vue";  

const { openCart } = useCart();
const router = useRouter();

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>


<template>
  <nav class="navbar">
    <router-link to="/" class="nav-logo">
      <img src="/nav_logo.png" alt="Patissier" class="nav-logo-img" />
    </router-link>

    <div class="nav-links">
      <router-link to="/products">Products</router-link>

      <button @click="openCart" class="cart-btn">🛒</button>

      <div v-if="authStore.isAuthenticated()" class="auth-menu">
        <span class="hello">Hello, {{ authStore.user?.nickname || 'User' }}</span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>

      <div v-else class="auth-links">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </div>
  </nav>

  <main>
    <router-view />
  </main>

  <CartSlideOver />
</template>
