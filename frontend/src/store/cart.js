import { defineStore } from 'pinia';
import api from '../api/axios'; // Chemin relatif vers /frontend/src/api/axios

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        loading: false,
        error: null,
    }),

    getters: {
        cartTotal: (state) => {
            return state.items.reduce((total, item) => {
                const price = item.product?.price || 0;
                return total + (price * item.quantity);
            }, 0).toFixed(2);
        },
        cartItemCount: (state) => {
            return state.items.reduce((count, item) => count + item.quantity, 0);
        }
    },

    actions: {
        async fetchCart() {
            this.loading = true;
            try {
                const apiResponse = await api.get('/cart');
                this.items = Array.isArray(apiResponse.data) ? apiResponse.data : [];
                this.error = null;
            } catch (err) {
                this.items = [];
                this.error = "Failed to load cart data.";
                console.error("Fetch Cart Error:", err);
            } finally {
                this.loading = false;
            }
        },

        async addToCart(productId, quantity = 1) {
            try {
                await api.post('/cart/add', { productId, quantity });
                // Mettre à jour l'état du panier après l'ajout
                await this.fetchCart();
            } catch (err) {
                this.error = "Error adding product to cart.";
                console.error("Add To Cart Error:", err);
            }
        },

        async removeFromCart(productId) {
            try {
                await api.delete(`/cart/remove/${productId}`);
                await this.fetchCart();
            } catch (err) {
                this.error = "Error removing product from cart.";
                console.error("Remove From Cart Error:", err);
            }
        },

        async updateQuantity(productId, quantity) {
            if (quantity <= 0) {
                await this.removeFromCart(productId);
                return;
            }
            try {
                await api.put('/cart/update', { productId, quantity });
                await this.fetchCart();
            } catch (err) {
                this.error = "Error updating quantity.";
                console.error("Update Quantity Error:", err);
            }
        }
    }
});