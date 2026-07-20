import { Router } from "express";
import { pool } from "../config/database.js";
import { auth } from "../middleware/middlewares.js";
import logger from "../config/log.js";

const protectedRouter = Router();

// GET /api/me
protectedRouter.get(
  "/",
  auth, // Authenticating the cookies token
  async (req, res) => {
    const userId = req.user.userId;
    let user;
    try {
      user = await pool.query(
        `
        SELECT id,
               username,
               email
        FROM users 
        WHERE id = $1;
        `,
        [userId],
      );
    } catch (err) {
      logger.error(err);

      return res.status(500).json({
        error: "Internal Error",
      });
    }

    if (!user.rows[0]) {
      return res.status(404).json({
        error: "User not found.",
        authenticated: false,
      });
    }
    return res.status(200).json({
      details: user.rows[0],
      authenticated: true,
    });
  },
);

export default protectedRouter;
