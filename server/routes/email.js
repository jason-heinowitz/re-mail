const router = require('express').Router();
const emailController = require('../controllers/emailController');

router.get('/', (req, res) => {
  res.status(200).send('Successfully requested /api');
});

router.get('/check', emailController.getUser, emailController.sendUser);

router.get('/emails', emailController.getUser, emailController.getEmails);

router.post('/email', emailController.getUser, emailController.createEmail);

router.delete('/email', emailController.getUser, emailController.deleteEmail);

module.exports = router;
