import { Router } from "express";
import { auth } from "../middleware/middlewares.js";
import { NODE_ENV } from "../config/env.js";

const logoutRouter = Router();

// POST /api/logout
logoutRouter.post("/", auth, (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV === "production",
    path: "/",
  });

  return res.sendStatus(200);
});

export default logoutRouter;
