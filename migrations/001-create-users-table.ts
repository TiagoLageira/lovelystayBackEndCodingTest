import db from "../migrations/database"

export async function createTable(): Promise<void> {
  try {
    await db.none(`
 CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  company VARCHAR(255),
  location VARCHAR(255),
  email VARCHAR(255),
  languages JSONB
 );
 `);
    console.log("Table ready");
  } catch (error) {
    console.error("Table not ready", error);
  }
}