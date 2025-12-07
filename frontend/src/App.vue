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

<style scoped>
:root {
  --color-body-background: #242424; 
}

body {
  margin: 0;
  min-width: 320px;
  background-color: var(--color-body-background);
  color: var(--color-text);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;     top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(26, 26, 26, 0.95); 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); 
  border-bottom: 1px solid #333;
}

main {
  padding-top: 80px; 
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  min-height: calc(100vh - 80px);
}

.navbar:hover {
  background-color: #1a1a1a;
}

.auth-links {
    display: flex;
    margin-right: 40px;
    gap: 1rem;
    align-items: center; 
}
</style>