import app from "./app.js";
import { APP_PORT } from "./config/env.js";
import { pool } from "./config/database.js";
import logger from "./config/log.js";

// app server
const server = app.listen(APP_PORT, "0.0.0.0", () =>
  logger.success(`Server started successfully on port ${APP_PORT}.`),
);

// Graceful shutdown
const shutdown = async () => {
  logger.info("Shutting down...");

  try {
    await pool.end();
  } finally {
    server.close(() => process.exit(0));
  }
};

// Shutting down (by signals)
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
