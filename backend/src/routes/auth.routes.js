console.log("AUTH ROUTES LOADED !!!");

import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Route inscription
router.post("/register", register);

// Route connexion
router.post("/login", login);

export default router;

