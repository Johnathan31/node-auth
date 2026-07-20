import { Router } from "express";
import { pool } from "../config/database.js";
import { loginLimiter } from "../middleware/middlewares.js";
import { JWT_SECRET } from "../config/env.js";
import { ISSUER, NODE_ENV } from "../config/env.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../config/log.js";

const loginRouter = Router();

// POST /api/login
loginRouter.post("/", loginLimiter, async (req, res) => {
  // Validating email
  if (!req.body.email) {
    return res.status(400).json({
      error: "email is missing or empty.",
    });
  }

  // Validating password
  if (!req.body.password) {
    return res.status(400).json({
      error: "password is missing or empty.",
    });
  }

  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  try {
    const result = await pool.query(
      `
      SELECT id, password_hash FROM users
      WHERE email = $1;
      `,
      [email],
    );
    const user = result.rows[0];

    // Auth for user existence
    if (!user) return res.sendStatus(401);

    // Validating password
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid credentials.",
      });
    }

    // Creating a token for the user
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
      algorithm: "HS256",
      issuer: ISSUER,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: NODE_ENV === "production",
      // Max-Age: 7 days (week)
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });
  } catch (err) {
    logger.error(err);

    return res.sendStatus(500);
  }

  return res.sendStatus(200);
});

export default loginRouter;
