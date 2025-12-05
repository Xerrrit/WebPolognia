import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

import { verifyToken, checkRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", verifyToken, checkRole("admin"), createProduct);
router.put("/:id", verifyToken, checkRole("admin"), updateProduct);
router.delete("/:id", verifyToken, checkRole("admin"), deleteProduct);

export default router;
