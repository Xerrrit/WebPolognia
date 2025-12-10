import { ref } from "vue";
import api from "../api/axios";

export const useCart = (() => {
  const cart = ref([]);
  const loading = ref(false);
  const visible = ref(false);

  async function fetchCart() {
    loading.value = true;
    try {
      const res = await api.get("/cart");
      cart.value = res.data;
    } catch (err) {
      console.error("Erreur chargement panier:", err);
    } finally {
      loading.value = false;
    }
  }

  async function removeItem(id) {
    try {
      await api.delete(`/cart/${id}`);
      await fetchCart();
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  }

  function openCart() {
    visible.value = true;
    fetchCart();
  }

  function closeCart() {
    visible.value = false;
  }

  return () => ({
    cart,
    loading,
    visible,
    openCart,
    closeCart,
    removeItem,
  });
})();
