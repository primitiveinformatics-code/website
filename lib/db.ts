import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DATABASE_URL ? undefined : (process.env.DB_HOST || "localhost"),
  port: process.env.DATABASE_URL ? undefined : Number(process.env.DB_PORT || 5432),
  database: process.env.DATABASE_URL ? undefined : (process.env.DB_NAME || "primitive"),
  user: process.env.DATABASE_URL ? undefined : (process.env.DB_USER || "postgres"),
  password: process.env.DATABASE_URL ? undefined : (process.env.DB_PASSWORD || "postgres"),
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

export default pool;
