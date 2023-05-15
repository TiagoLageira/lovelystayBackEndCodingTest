import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const pgp = pgPromise();
const db = pgp({
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
});

export default db;