import { Router } from "express";
import { registerLimiter } from "../middleware/middlewares.js";
import { pool } from "../config/database.js";
import bcrypt from "bcryptjs";
import logger from "../config/log.js";

const registerRouter = Router();

// POST /api/register
registerRouter.post("/", registerLimiter, async (req, res) => {

  if (
    // Auth for valid fields (or null values)
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({
      error: "Fields aren't complete",
      status: 400,
    });
  }

  // Email Regular Expression
  const emailRE = /^\S+@\S+\.\S+$/i;

  // Validating email syntax
  if (!emailRE.test(String(req.body.email))) {
    return res.status(400).json({
      error: `Invalid email.`,
    });
  }

  const username = req.body.username.trim();
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  if (password.length < 8) {
    return res.status(422).json({
      error: "Password must be at least 8 characters.",
    });
  }

  if (
    !/\d+/i.test(password) ||
    !/[a-z]+/i.test(password) ||
    !/[^a-z0-9]/i.test(password)
  ) {
    return res.status(422).json({
      error: "Password must contain letters, digits, and special characters.",
    });
  }

  // Hashing the password
  let passwordHash;
  try {
    passwordHash = await bcrypt.hash(password, 12);

    // Adding the new user to the DB
    await pool.query(
      `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3);
      `,
      [username, email, passwordHash],
    );
  } catch (err) {
    logger.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        error: `Username or email already exists.`,
      });
    }
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
});

export default registerRouter;
