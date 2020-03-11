const router = require('express').Router();
const authController = require('../controllers/authController');

// Login
router.post('/login', authController.isUsernameValid);

// Register
router.post('/register');

// Validate JWT
router.post('/validate');

// Get users
router.get('/users');

// Change password
router.post('/newPassword');

module.exports = router;
