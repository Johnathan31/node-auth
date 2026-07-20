import { Pool } from "pg";
import {
  PG_PORT,
  HOST,
  DB_NAME,
  DB_URL,
  USER,
  NODE_ENV,
  PASSWORD,
} from "./env.js";

// Local PostgreSQL config
const localDB = {
  port: PG_PORT,
  host: HOST,
  database: DB_NAME,
  password: PASSWORD,
  user: USER,
};

// Cloud PostgreSQL config
const cloudDB = {
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

// DB pool
export const pool = new Pool(NODE_ENV === "production" ? cloudDB : localDB);
