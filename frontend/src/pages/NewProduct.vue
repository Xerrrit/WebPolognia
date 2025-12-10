<template>
  <div class="create-product">
    <h1>Créer un produit</h1>

    <form @submit.prevent="createProduct">

      <!-- Name -->
      <div class="form-group">
        <label for="name">Nom du produit</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <!-- Price -->
      <div class="form-group">
        <label for="price">Prix</label>
        <input type="number" id="price" v-model="price" required />
      </div>

      <!-- Image -->
      <div class="form-group">
        <label for="image">Image (URL)</label>
        <input type="text" id="image" v-model="image" required />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>

      <!-- Stock -->
      <div class="form-group">
        <label for="stock">Stock</label>
        <input type="number" id="stock" v-model="stock" required />
      </div>

      <!-- Submit -->
      <button type="submit">Créer le produit</button>

    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateProduct",

  data() {
    return {
      name: "",
      price: 0,
      image: "",
      description: "",
      stock: 0,
    };
  },

  methods: {
    async createProduct() {
      try {
        // Récupération du token
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Vous devez être connecté !");
          return;
        }

        const productData = {
          name: this.name,
          price: this.price,
          image: this.image,
          description: this.description,
          stock: this.stock
        };

        // Requête POST vers l'API
        await axios.post(
          "http://localhost:4000/products",
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Produit créé avec succès !");
        this.$router.push("/products"); // redirige vers la liste
      } catch (error) {
        console.error(error);
        alert("Erreur lors de la création du produit.");
      }
    },
  },
};
</script>

