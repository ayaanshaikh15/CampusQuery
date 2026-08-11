import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiLimiter from "./RateLimit.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* =========================
   SECURITY MIDDLEWARE
========================= */

// Security headers
app.use(helmet());

// Allow frontend to communicate with backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json({ limit: "10kb" }));

// Basic API rate limiting

app.use("/api", apiLimiter);


/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusQuery API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});


/* =========================
   TEST API
========================= */

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is connected successfully",
  });
});


/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: "Internal server error",
  });
});


/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`CampusQuery API running on port ${PORT}`);
});