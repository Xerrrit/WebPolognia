import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let dbInstance = null;

async function getDb() {
  if (dbInstance) return dbInstance;

  dbInstance = await open({
    filename: path.join(process.cwd(), 'local.db'),
    driver: sqlite3.Database
  });

  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickname TEXT,
      email TEXT UNIQUE,
      password_hash TEXT,
      role TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      image TEXT,
      description TEXT,
      stock INTEGER
    );

    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_id INTEGER,
      quantity INTEGER
    );
  `);

  const admin = await dbInstance.get("SELECT * FROM users WHERE email = 'admin@test.com'");
  if (!admin) {
  }

  return dbInstance;
}

export const db = {
  async query(sql, params = []) {
    const conn = await getDb();

    const isSelect = sql.trim().toUpperCase().startsWith('SELECT');

    try {
      if (isSelect) {
        const rows = await conn.all(sql, params);
        return [rows, []];
      } else {
        const result = await conn.run(sql, params);
        return [{
          insertId: result.lastID,
          affectedRows: result.changes
        }, []];
      }
    } catch (err) {
      console.error("DB Error:", err.message, sql);
      throw err;
    }
  }
};
