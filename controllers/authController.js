const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// Generate Tokens
const generateTokens = (adminId) => {
  const accessToken = jwt.sign(
    { id: adminId }, 
    process.env.JWT_SECRET || "fallback_secret", 
    { expiresIn: "5m" } // Access Token expires in 5 minutes
  );
  
  const refreshToken = jwt.sign(
    { id: adminId }, 
    process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret", 
    { expiresIn: "7d" } // Refresh Token expires in 7 days
  );
  
  return { accessToken, refreshToken };
};

// @desc    Admin Login
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(admin._id);

    // Save refresh token to db
    admin.refreshToken = refreshToken;
    await admin.save();

    // Set Cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 60 * 1000 // 5 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      role: admin.role
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Refresh Access Token
// @route   POST /api/auth/refresh
exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret");
    
    // Check if token matches the one in DB
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate NEW access token
    const accessToken = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "5m" }
    );

    // Set new access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 60 * 1000 // 5 minutes
    });

    res.status(200).json({ success: true, message: "Token refreshed" });

  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(403).json({ message: "Refresh token expired or invalid" });
  }
};

// @desc    Admin Logout
// @route   POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    // Clear refresh token from DB if we have one
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret", { ignoreExpiration: true });
      await Admin.findByIdAndUpdate(decoded.id, { refreshToken: null });
    }

    // Clear Cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server Error during logout" });
  }
};

// @desc    Verify Admin Session
// @route   GET /api/auth/check
exports.checkAuth = (req, res) => {
  // If the request makes it here, the protectAdmin middleware passed
  res.status(200).json({ success: true, user: req.admin });
};
