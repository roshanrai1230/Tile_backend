const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protectAdmin = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET || "fallback_secret");
      
      // Get admin from token
      req.admin = await Admin.findById(decoded.id).select("-password -refreshToken");
      
      if (!req.admin) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      // If token is expired, send 401 so frontend knows to try refreshing
      return res.status(401).json({ message: "Not authorized, token failed", expired: true });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ message: "Server Error in authorization" });
  }
};

module.exports = { protectAdmin };
