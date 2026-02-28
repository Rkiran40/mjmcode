// const express = require("express");
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // Check credentials from .env
//     if (
//       username === process.env.ADMIN_USERNAME &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       // You can set a static id or username for the token payload
//       const token = jwt.sign(
//         { id: 1, username: process.env.ADMIN_USERNAME },
//         process.env.JWT_SECRET || "SECRET_KEY",
//         { expiresIn: "1d" }
//       );
//       return res.json({ token });
//     } else {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (err) {
//     console.error("ADMIN LOGIN ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ✅ Hardcoded credentials
const ADMIN_USERNAME = "admin@pratyaksha.com";
const ADMIN_PASSWORD = "News@P2026";

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Check credentials
    if (
      username !== ADMIN_USERNAME ||
      password !== ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;