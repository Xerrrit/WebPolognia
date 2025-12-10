<template>
    <div v-if="cartStore.loading">
        <p>Chargement du panier...</p>
    </div>
    <div v-else-if="cartStore.items.length > 0" class="cart-content">
        <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
    </div>
</div>
</template>

<style scoped>
/* Vos styles ici */
</style>

<script setup>
import { onMounted } from 'vue';
import { useCartStore } from '../store/cart'; // 👈 Importer le Store

const cartStore = useCartStore(); // 👈 Utiliser le Store

// Charger les données du panier au montage du composant
onMounted(() => {
    cartStore.fetchCart();
});

// Ajoutez ici toute fonction spécifique au composant, comme le paiement
</script>