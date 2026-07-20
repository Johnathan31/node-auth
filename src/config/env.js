import { config } from "dotenv";

// Loading environment configuration
config({ quiet: true });

// Environment Variables
export const APP_PORT = +process.env.APP_PORT || 3000;
export const PG_PORT = +process.env.PG_PORT || 5432;
export const HOST = process.env.PG_HOST || "localhost";
export const USER = process.env.PG_USER || "postgres";
export const DB_NAME = process.env.PG_DB || "accounts";
export const PASSWORD = process.env.PG_PWD;
export const DB_URL = process.env.DB_URL;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const JWT_SECRET = process.env.JWT_SECRET;
export const ISSUER = process.env.ISS || "node-auth";

// Verfying the JWT Secret environment variable exists
if (!JWT_SECRET) {
  throw new Error("JWT Secret isn't provided.");
}
