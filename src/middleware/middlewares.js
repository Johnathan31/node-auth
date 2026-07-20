import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import { JWT_SECRET, ISSUER } from "../config/env.js";
import logger from "../config/log.js";

export const registerLimiter = rateLimit({
  windowMs: 1000 * 60 * 40, //  40 min
  limit: 4,
});

// Login rate limiter Middleware
export const loginLimiter = rateLimit({
  windowMs: 1000 * 60 * 15, // 15 min
  limit: 6,
});

/* AUTH VALIDATION Middleware */
export function auth(req, res, next) {
  if (!req.cookies.token) {
    return res.status(401).json({
      authenticated: false,
    });
  }

  const authToken = req.cookies.token;

  try {
    // Verifying auth token
    const payload = jwt.verify(authToken, JWT_SECRET, { issuer: ISSUER });

    req.user = payload;
    next();
  } catch {
    return res.status(401).json({
      authenticated: false,
    });
  }
}

// General Errors Middleware
export function errorMiddleware(err, _req, res, _next) {
  logger.error(err);

  res.status(500).json({
    error: "Internal Server error",
  });
}

export function log(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage} (${Date.now() - start}ms)`,
    );
  });

  res.on("close", () => {
    if (!res.writableEnded) {
      logger.info(`${req.method} ${req.originalUrl} Connection closed.`);
    }
  });

  next();
}

export function notFoundMiddleware(_, res) {
  res.status(404).json({
    error: "Route not found",
  });
}
