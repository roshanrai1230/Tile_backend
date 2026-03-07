const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protectAdmin } = require("../middleware/authMiddleware");

// Public routes for admin auth
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

// Protected check route
router.get("/check", protectAdmin, authController.checkAuth);

module.exports = router;
