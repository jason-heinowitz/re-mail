const router = require('express').Router();
const authController = require('../controllers/authController');

// Login
router.post(
  '/login',
  authController.isUsernameValid,
  authController.checkUsernamePassword,
  authController.createSession
);

// Register
router.post(
  '/register',
  authController.isUsernameValid,
  authController.createUser,
  authController.createSession
);

// Validate JWT
router.get('/validate', authController.validateJWT);

// Get users
router.get('/users');

// Change password
router.post('/newPassword');

module.exports = router;
