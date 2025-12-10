import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateQuantity);
router.delete("/:id", verifyToken, removeFromCart);
router.delete("/", verifyToken, clearCart);

export default router;
