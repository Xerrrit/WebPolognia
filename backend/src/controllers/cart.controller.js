import { db } from "../db.js";

// GET /cart → voir le panier du user connecté
export async function getCart(req, res) {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT c.id, c.quantity, p.name, p.price, p.image
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /cart/add → ajouter au panier
export async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: "Missing product_id" });
    }

    const [existing] = await db.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, product_id]
    );

    // Si déjà dans le panier → augmenter la quantité
    if (existing.length > 0) {
      await db.query(
        "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
        [quantity || 1, userId, product_id]
      );

      return res.json({ message: "Quantity updated" });
    }

    // Sinon → nouvel item
    await db.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [userId, product_id, quantity || 1]
    );

    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE /cart/:id → enlever une ligne du panier
export async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await db.query(
      "DELETE FROM cart WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    res.json({ message: "Removed from cart" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateQuantity(req, res) {
  try {
    const userId = req.user.id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;

    if (!product_id || quantity == null) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await db.query(
      "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
      [quantity, userId, product_id]
    );

    res.json({ message: "Quantity updated" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function clearCart(req, res) {
  try {
    const userId = req.user.id;

    await db.query(
      "DELETE FROM cart WHERE user_id = ?",
      [userId]
    );

    res.json({ message: "Cart cleared" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}