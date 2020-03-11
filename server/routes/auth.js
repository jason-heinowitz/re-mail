const router = require('express').Router();
const loginController = require('../controllers/loginController');

// Login
router.post(
  '/login',
  loginController.verifyUser,
  loginController.createSession
);

// Logout
// POSTing logout better practice than GETing logout
router.post('/logout', loginController.invalidateSession);

// Register
router.post(
  '/register',
  loginController.existance,
  loginController.createUser,
  loginController.createSession
);

// Validate cookies
router.get('/check', loginController.verifyJWT);

router.get('/users', loginController.getUsers);

router.post(
  '/checkLogin',
  loginController.verifyUser,
  loginController.sendVerify
);

router.post('/password', loginController.changePassword);

module.exports = router;
