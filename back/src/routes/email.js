const router = require('express').Router();
const emailController = require('../controllers/emailController');

router.get('/', (req, res) => {
  res.status(200).send('Successfully requested /api');
});

router.get('/emails', emailController.getUser, emailController.getEmails);

router.post('/email', emailController.getUser, emailController.createEmail);

module.exports = router;
