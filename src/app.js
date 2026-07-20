import express from "express";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
import protectedRouter from "./routes/profile.js";
import {
  errorMiddleware,
  log,
  notFoundMiddleware,
} from "./middleware/middlewares.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(log);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// Routes
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/logout", logoutRouter);
app.use("/api/v1/me", protectedRouter);

// Health check route
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
