<script setup>
import { authStore } from './store/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="nav-logo">WebPolognia</router-link>
    <div class="nav-links">
      <router-link to="/products">Products</router-link>
      <router-link to="/cart">Cart</router-link>
      
      <router-link v-if="authStore.isAdmin()" to="/admin">Admin</router-link>

      <div v-if="authStore.isAuthenticated()" class="auth-menu">
        <span>Hello, {{ authStore.user?.nickname || 'User' }}</span>
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
</template>


