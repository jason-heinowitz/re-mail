const router = require('express').Router();
const emailController = require('../controllers/emailController');

// Get emails
router.get('/emails', emailController.getUsername, emailController.getEmails);

// Send email
router.post('/email', emailController.getUsername, emailController.sendEmail);

// Delete email
router.delete(
  '/email',
  emailController.getUsername,
  emailController.deleteEmail
);

module.exports = router;
