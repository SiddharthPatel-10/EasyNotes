const express = require("express");
const { signup, login, logout } = require("../controllers/userController");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");
const { protect, admin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);

// Protected Routes
router.get("/logout", protect, logout);

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Example of an admin-protected route
router.get("/admin-route", protect, admin, (req, res) => {
  res.send("Admin access only");
});

module.exports = router;
