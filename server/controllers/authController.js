const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const SECRET_KEY =
  '!_7-~7y~3;70;.*%7I+8=_30M8k4^*:^~v+!Z4:i~k78-;|~.61_867^+3^|+;^18-3^+A9=~_.=6=-+F92^M3|^*--03::~=!ps32~-95+-|+z383!K!~40;1%!|g%b';

const pool = new Pool({
  connectionString:
    'postgres://eryjbgqn:x4P61_3N4EbBjB0L6I-i0NQCUBWGxNlv@drona.db.elephantsql.com:5432/eryjbgqn',
});

const authController = {};

// check if username is valid for operation
authController.isUsernameValid = (req, res, next) => {
  /* passCondition is true or false depending on what the requester needs the
  username to validate to. ie. for new user creation, the username needs to fail lookup
  but for login, the usrename needs to exist */

  const { username, passCondition } = req.body;

  const checkUsernameQuery = `SELECT * from users u WHERE u.username='${username}'`;
  pool.query(checkUsernameQuery, (err, qres) => {
    if (err) {
      return next({
        code: 500,
        message: 'Unable to complete your login request at this time.',
        log: `authController.isUsernameValid: failed to query DB for username(${username})`,
      });
    }

    // if rows is greater than 0, user exists
    const doesUserExist = qres.rows.length !== 0;
    if (doesUserExist !== passCondition) {
      return next({
        code: 400,
        message: 'Username and/or password are incorrect.',
        log: 'loginController.verifyUser: Password does not exist for user',
      });
    }

    return next();
  });
  // WARNING: outside username query
};

// check if username/ password is good

// create user with supplied information

// create session

// get list of [verfied] users

// update password of user

module.exports = authController;
