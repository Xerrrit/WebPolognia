
console.log("APP LOADED FROM:", import.meta.url);
console.log("Current working directory:", process.cwd());

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();


app.use(cors());
app.use(express.json());

app.use("/cart", cartRoutes); 
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
