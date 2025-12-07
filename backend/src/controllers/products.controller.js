import { db } from "../db.js";

// GET /products
export async function getProducts(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    console.log("PRODUCTS FROM DB:", rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
}

// GET /products/:id
export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /products  (admin only)
export async function createProduct(req, res) {
  try {
    const { name, price, image, description, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await db.query(
      "INSERT INTO products (name, price, image, description, stock) VALUES (?, ?, ?, ?, ?)",
      [name, price, image || null, description || null, stock || 0]
    );

    res.json({ message: "Product created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// PUT /products/:id  (admin only)
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, image, description, stock } = req.body;

    const [exists] = await db.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (exists.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    await db.query(
      "UPDATE products SET name=?, price=?, image=?, description=?, stock=? WHERE id=?",
      [name, price, image, description, stock, id]
    );

    res.json({ message: "Product updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE /products/:id  (admin only)
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const [exists] = await db.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (exists.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    await db.query("DELETE FROM products WHERE id = ?", [id]);

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
