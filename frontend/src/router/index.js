import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Products from "../pages/Products.vue";
import ProductPage from "../pages/ProductPage.vue";
import Cart from "../pages/Cart.vue";
import AdminPanel from "../pages/AdminPanel.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/products", component: Products },
  { path: "/products/:id", component: ProductPage },
  { path: "/cart", component: Cart },
  {
    path: "/admin",
    component: AdminPanel,
    meta: { requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protection des routes admin
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("role");

  if (to.meta.requiresAdmin && role !== "admin") {
    return next("/login");
  }

  next();
});

export default router;
