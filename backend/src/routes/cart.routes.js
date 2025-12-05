import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  getCart,
  addToCart,
  removeFromCart
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.delete("/:id", verifyToken, removeFromCart);

export default router;
