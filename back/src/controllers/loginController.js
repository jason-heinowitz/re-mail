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

const loginController = {};

loginController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  const checkUsernameAndPassword = `SELECT * FROM users u WHERE u.username='${username}'`;
  pool.query(checkUsernameAndPassword, (err, response) => {
    if (err) {
      return next({
        code: 403,
        message: 'Unable to complete your login request at this time.',
        log: 'loginController.verifyUser: failed to query DB',
      });
    } else if (response.rows.length === 0) {
      return next({
        code: 403,
        message: 'Username and/or password are incorrect.',
        log: 'loginController.verifyUser: Password does not exist for user',
      });
    }

    const hashedPassword = response.rows[0].password;

    bcrypt.compare(password, hashedPassword, (berr, result) => {
      if (berr) {
        console.log('Bcrypt failed to check passwords.');
        return next({
          code: 403,
          message: 'Username and/or password are incorrect.',
          log:
            'loginController.verifyUser: brcypt errored when comparing passwords',
        });
      }

      if (result) {
        return next();
      }

      return next({
        code: 403,
        message: 'Username and/or password are incorrect.',
        log: 'loginController.verifyUser: User entered password wrong',
      });
    });
  });
};

loginController.createUser = (req, res, next) => {
  const { username, password, firstname, lastname } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) {
      return next({
        code: 403,
        message: 'Unable to create user at this time.',
        log:
          "loginController.createUser: brcypt failed to hash user's password",
      });
    }

    const createUserInDB = `INSERT INTO users (username, password, firstname, lastname) VALUES ('${username}', '${hashedPassword}', '${firstname}', '${lastname}')`;

    pool.query(createUserInDB, (err, response) => {
      if (err) {
        return next({
          error: 403,
          message: 'Could not create user at this time.',
          log: 'loginController.createUser: DB failed to create a new user',
        });
      }
      return next();
    });
  });
};

loginController.invalidateSession = (req, res, next) => {
  res.cookie('token', 'logged-out');
  return res.status(200).json('Logged out');
};

loginController.createSession = (req, res, next) => {
  const { username } = req.body;

  jwt.sign(
    {
      username,
    },
    SECRET_KEY,
    (err, token) => {
      if (err) {
        return next({
          code: 403,
          message: 'Could not log in at this time.',
          log: 'loginController.createSession: failed to create session',
        });
      }

      res.cookie('token', token, {
        httpOnly: true,
      });
      return res.status(200).json('Created session');
    }
  );
};

loginController.existance = (req, res, next) => {
  const { username } = req.body;

  const doesUserExist = `SELECT * FROM users u WHERE u.username='${username}'`;
  pool.query(doesUserExist, (err, response) => {
    if (err) {
      return next({
        code: 403,
        message:
          'Error processing request to register. Please try again at a later time, or contact support if the issue continues.',
        log:
          'loginController.existance: failed when querying DB to check if username in use',
      });
    }
    if (response.rows.length === 0) {
      return next();
    }

    return next({
      code: 403,
      message: 'Username is currently in use.',
      log:
        'loginController.existance: user prevented from using username in use',
    });
  });
};

loginController.verifyJWT = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) {
      return next({
        code: 403,
        message: 'Could not verify user.',
        log: 'loginController.verifyJWT: user passed invalid JWT to server',
      });
    }

    return res.status(200).json('JWT verified');
  });
};

module.exports = loginController;
