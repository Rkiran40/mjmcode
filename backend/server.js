require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");

const newsRoutes = require("./routes/newsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const videoRoutes = require("./routes/videoRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const breakingNewsRoutes = require("./routes/breakingNewsRoutes");

const app = express();

/* ======================================================
   CORS CONFIG (FIXED)
====================================================== */

// Default allowed origins (development + production)
const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://pratyakshanews.com",
  "https://www.pratyakshanews.com"
];

// If ENV exists → merge with defaults
const allowedOrigins = process.env.CORS_ORIGIN
  ? [
      ...defaultOrigins,
      ...process.env.CORS_ORIGIN.split(",").map(o => o.trim())
    ]
  : defaultOrigins;

const corsOptions = {
  origin: function (origin, callback) {

    // Allow Postman / mobile apps / server-to-server
    if (!origin) return callback(null, true);

    // Allow any localhost port during development
    if (
      process.env.NODE_ENV === "development" &&
      origin.startsWith("http://localhost:")
    ) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    logger.warn(`Blocked by CORS: ${origin}`);
    return callback(new Error("Not allowed by CORS"));
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS
app.use(cors(corsOptions));

// IMPORTANT: handle preflight requests globally
app.options("*", cors(corsOptions));

/* ======================================================
   BODY PARSER
====================================================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ======================================================
   SECURITY HEADERS
====================================================== */

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Enable HSTS only in production (important fix)
  if (process.env.NODE_ENV === "production") {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  next();
});

/* ======================================================
   REQUEST LOGGER
====================================================== */

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

/* ======================================================
   STATIC UPLOADS (FIXED CORS SUPPORT)
====================================================== */

app.use(
  "/uploads",
  cors(corsOptions),
  express.static("uploads")
);

/* ======================================================
   ROUTES
====================================================== */

app.use("/api/news", newsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/breaking-news", breakingNewsRoutes);

/* ======================================================
   HEALTH CHECK
====================================================== */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

/* ======================================================
   404 HANDLER
====================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ======================================================
   ERROR HANDLER
====================================================== */

app.use(errorHandler);

/* ======================================================
   SERVER START
====================================================== */

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});

/* ======================================================
   GLOBAL ERROR HANDLING
====================================================== */

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection", { error: err.message });
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", { error: err.message });
  process.exit(1);
});