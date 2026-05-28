const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const migrationsDir = path.join(__dirname, "../lib/migrations");

async function run() {
  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    try {
      await pool.query(sql);
      console.log("✓", file);
    } catch (err) {
      console.error("✗", file, "—", err.message);
      process.exit(1);
    }
  }
  await pool.end();
  console.log("Done.");
}

run();
