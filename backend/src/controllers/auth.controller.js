console.log("AUTH CONTROLLER LOADED");

import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { nickname, email, password } = req.body;

  if (!nickname || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const [exists] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (exists.length > 0) {
    return res.status(409).json({ message: "Email already used" });
  }

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (nickname, email, password_hash) VALUES (?, ?, ?)",
    [nickname, email, hash]
  );

  res.json({ message: "User created" });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const user = rows[0];

  const validPassword = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    message: "Logineuh OK.",
    token,
    nickname: user.nickname,
    role: user.role,
  });
}
