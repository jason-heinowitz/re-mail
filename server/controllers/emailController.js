const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Email } = require('../models/emailModel');

const SECRET_KEY =
  '!_7-~7y~3;70;.*%7I+8=_30M8k4^*:^~v+!Z4:i~k78-;|~.61_867^+3^|+;^18-3^+A9=~_.=6=-+F92^M3|^*--03::~=!ps32~-95+-|+z383!K!~40;1%!|g%b';

const emailController = {};

emailController.getUser = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) {
      console.log(err);
      return next({
        code: 403,
        message: 'Could not get user at this time.',
        log: 'emailController.getUser: user passed invalid JWT to server',
      });
    }

    res.locals.username = payload.username;
    return next();
  });
};

emailController.createEmail = (req, res, next) => {
  const { username } = res.locals;
  const { to, body } = req.body;

  Email.create(
    {
      to,
      from: `${username}@codesmith.io`,
      body,
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
    (err, response) => {
      if (err) {
        return next({
          code: 500,
          message: 'Unable to send email at this time.',
          log: 'emailController.createEmail: failed to create email in DB',
        });
      }

      return res.status(200).json('Successfully sent email');
    }
  );
};

emailController.getEmails = (req, res, next) => {
  const { username } = res.locals;

  Email.find({ to: `${username}@codesmith.io` }, (err, docs) => {
    if (err) {
      return next({
        code: 404,
        message: 'Unable to retrieve emails at this time.',
        log:
          'emailController.getEmails: errored when querying db for emails to user',
      });
    }

    return res.status(200).json(docs);
  });
};

emailController.deleteEmail = (req, res, next) => {
  const { id } = req.body;

  Email.findByIdAndDelete(id, (err, response) => {
    if (err) {
      return next({
        code: 403,
        message: 'Unable to delete email at this time.',
        log: 'emailController.deleteEmail: DB errored when deleting user email',
      });
    }

    return res.status(200).json('Deleted email successfully');
  });
};

emailController.sendUser = (req, res, next) => {
  return res.status(200).json({ username: res.locals.username });
};

module.exports = emailController;
