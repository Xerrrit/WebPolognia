<template>
    <h1>Cart</h1>
</template>
<style scoped>

</style>
<script
setup>// Fonction pour le chargement du panier
function loadCartItems() {
    // 1. Changer l'URL pour cibler l'API du panier de l'utilisateur
    fetch("http://localhost:4000/cart")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(cartItems => {
            // 2. Cibler le conteneur du panier
            const container = document.getElementById("cart-item-list");
            container.innerHTML = ''; // Nettoyer l'ancien contenu

            // --- Logique d'affichage des articles du panier ---
            cartItems.forEach(item => {
                // Supposons que l'API du panier retourne { product: { name, price, image, id }, quantity: 2, total: 90.00 }
                const product = item.product;
                const itemTotal = (product.price * item.quantity).toFixed(2);
                
                const cartItemElement = document.createElement("div");

                // 3. Adapter le HTML pour le panier
                cartItemElement.innerHTML = `
                    <div class="cart-item" data-product-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="item-image">
                        
                        <div class="item-details">
                            <h3>${product.name}</h3>
                            <p>Prix Unitaire: ${product.price}€</p>
                            <p>Quantité: ${item.quantity}</p>
                            <button class="remove-item-btn" onclick="removeItemFromCart(${product.id})">Supprimer</button>
                        </div>
                        
                        <div class="item-price-total">
                            ${itemTotal}€
                        </div>
                    </div>
                `;
                container.appendChild(cartItemElement);
            });
            // (Optionnel) Ici, vous appelleriez une fonction pour mettre à jour le résumé du panier
            // updateCartSummary(cartItems);

        })
        .catch(error => {
            console.error("ERROR fetching cart items:", error);
            document.getElementById("cart-item-list").innerHTML = 
                `<p class="error-message">Impossible de charger le panier.</p>`;
        });
}

// Assurez-vous d'appeler cette fonction au chargement de la page
// document.addEventListener('DOMContentLoaded', loadCartItems);
</script>