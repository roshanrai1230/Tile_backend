const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');

// Public routes for user auth
router.post('/register', userAuthController.registerUser);
router.post('/login', userAuthController.loginUser);
router.post('/logout', userAuthController.logoutUser);

// Protected profile route (handled in controller)
router.get('/profile', userAuthController.getUserProfile);

module.exports = router;
