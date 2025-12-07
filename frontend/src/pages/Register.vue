<script setup>
import { ref } from 'vue';
import { authStore } from '../store/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const nickname = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleRegister() {
  error.value = '';
  loading.value = true;
  
  const result = await authStore.register(nickname.value, email.value, password.value);
  
  if (result.success) {
    // Determine where to redirect? Maybe login or auto-login
    // For now, redirect to login
    router.push('/login');
  } else {
    error.value = result.message;
  }
  
  loading.value = false;
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="nickname">Nickname</label>
          <input 
            type="text" 
            id="nickname" 
            v-model="nickname" 
            required 
            placeholder="Choose a nickname"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            placeholder="Enter your email"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="Choose a password"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>
      </form>
      
      <p class="auth-footer">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

