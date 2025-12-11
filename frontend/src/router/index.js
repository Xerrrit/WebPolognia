import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Products from "../pages/Products.vue";
import ProductPage from "../pages/ProductPage.vue";
import Cart from "../pages/Cart.vue";
import AdminPanel from "../pages/NewProduct.vue";
import EditProduct from "../pages/EditProduct.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/products", component: Products },
  { path: "/products/:id", component: ProductPage },
  { path: "/cart", component: Cart },
  {
    path: "/newProduct",
    component: AdminPanel,
    meta: { requiresAdmin: true }
  },
  {
    path:"/editProduct/:id",
    component: EditProduct,
    meta: {requiresAdmin: true}
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

import { authStore } from "../store/auth";

// Protection des routes admin
router.beforeEach((to, from, next) => {
  const isAuthenticated = authStore.isAuthenticated();
  const userRole = authStore.role;

  if (to.meta.requiresAdmin) {
    if (!isAuthenticated || userRole !== "admin") {
      return next("/login");
    }
  }

  // Optional: redirect to login if user is not authenticated for protected routes (like /cart)
  // if (to.path === '/cart' && !isAuthenticated) return next('/login');

  next();
});

export default router;
