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
        log: `loginController.verifyUser: passCondition(${passCondition}) failed(${doesUserExist})`,
      });
    }

    return next();
  });
  // WARNING: outside username query
};

// check if username/ password is good
authController.checkUsernamePassword = (req, res, next) => {
  const { username, password } = req.body;

  const getHashedPasswordQuery = `SELECT u.password FROM users u WHERE username='${username}'`;
  pool.query(getHashedPasswordQuery, (err, qres) => {
    if (err) {
      return next({
        code: 500,
        message: 'Unable to complete your login request at this time.',
        log: `authController.checkUsernamePassword: failed to query DB for password with username(${username})`,
      });
    }

    const hashedPassword = qres.rows[0].password;

    // password retrieved successfully - check against bcrypt
    bcrypt.compare(password, hashedPassword, (berr, result) => {
      if (berr) {
        return next({
          code: 403,
          message: 'Username and/or password are incorrect.',
          log: `loginController.checkUsernamePassword: brcypt errored when comparing passwords(${password}-${hashedPassword})`,
        });
      }

      // if password is good
      if (result) return next();

      return next({
        code: 403,
        message: 'Username and/or password are incorrect.',
        log: `loginController.checkUsernamePassword: user-supplied password(${password}) does not match encrypted password(${hashedPassword})`,
      });
    });
    // WARNING: outside bcrypt verification
  });
  // WARNING: outside password query
};

// create session
authController.createSession = (req, res, next) => {
  const { username } = req.body;

  jwt.sign(
    {
      username,
    },
    SECRET_KEY,
    (err, token) => {
      if (err) {
        return next({
          code: 500,
          message: 'Could not log in at this time.',
          log:
            'loginController.createSession: failed to create JWT(${username})',
        });
      }

      res.cookie('token', token, {
        httpOnly: true,
      });
      return res.status(200).json('Created session');
    }
  );
  // WARNING: outside jwt creation
};

// validate JWT
authController.validateJWT = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, SECRET_KEY, (err, usernameObj) => {
    if (err) {
      return next({
        code: 403,
        message: 'Could not verify user.',
        log: 'loginController.verifyJWT: user passed invalid JWT to server',
      });
    }

    return res.status(200).json(usernameObj.username);
  });
  // WARNING: outside JWT validation
};

// create user with supplied information
authController.createUser = (req, res, next) => {
  const { username, password, firstname, lastname } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) {
      return next({
        code: 403,
        message: 'Unable to create user at this time.',
        log: `loginController.createUser: brcypt failed to hash user's password${password}`,
      });
    }

    const createUserQuery = `INSERT INTO users (username, password, firstname, lastname) VALUES ('${username}', '${hashedPassword}', '${firstname}', '${lastname}')`;
    pool.query(createUserQuery, (perr) => {
      if (perr) {
        return next({
          error: 403,
          message: 'Could not create user at this time.',
          log: 'loginController.createUser: DB failed to create a new user',
        });
      }

      return next();
    });
    // WARNING: outside of pool query
  });
  // WARNING: outside of bcrypt hashing
};

// get list of [verfied] users

// update password of user

module.exports = authController;
