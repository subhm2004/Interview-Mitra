import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";

dotenv.config();

const app = express();

/* ===============================
   RATE LIMITING
================================= */

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many login attempts. Try again later." },
});

app.use("/api/", apiLimiter);
app.use("/api/auth/", authLimiter);

/* ===============================
   PRODUCTION READY CORS
================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://interview-mitra-9t6l.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.includes("vercel.app") // allow preview deployments
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ===============================
   MIDDLEWARE
================================= */

app.use(express.json());
app.use(cookieParser());

/* ===============================
   ROUTES
================================= */

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

/* ===============================
   SERVER START
================================= */

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
