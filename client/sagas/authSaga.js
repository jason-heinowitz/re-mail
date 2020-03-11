import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';

import * as types from '../constants/authTypesSaga';
import * as actions from '../actions/auth';

// helpers
const ac = (method, body) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

// doers
function* login(username, password) {
  try {
    console.log(
      ac('POST', {
        username,
        password,
        passCondition: true,
      })
    );

    const loginResponse = yield call(
      fetch,
      '/auth/login',
      ac('POST', {
        username,
        password,
        passCondition: true,
      })
    );

    if (loginResponse.status !== 200) yield put({ type: types.STOP_LOGIN });

    yield put(actions.loginSuccess());
  } finally {
    if (yield cancelled()) yield put(actions.loginFailed());
  }
}

function* checkCookes() {
  try {
    const loginResponse = yield call(fetch, '/auth/validate');

    if (loginResponse.status !== 200) {
      yield put({ type: types.STOP_LOGIN });
    }

    yield put(actions.loginSuccess());
  } finally {
    if (yield cancelled()) yield put(actions.loginFailed());
  }
}

function* register(userObj) {
  const { firstname, lastname, username, password } = userObj;

  const registerResponse = yield call(
    fetch,
    '/auth/register',
    ac('POST', {
      firstname,
      lastname,
      username,
      password,
      passCondition: false,
    })
  );

  if (registerResponse.status !== 200) {
    yield call({ type: types.STOP_REGISTER });
  }

  yield put(actions.registerSuccess());
}

function* logout() {}

// watchers
// waits for login, cookies, and regstration, then waits for logout and login failure
export function* watchAuth() {
  // loop so continuous login/logout possible
  while (true) {
    const startOfAuth = yield take([
      types.LOGIN,
      types.CHECK_COOKIES,
      types.REGISTER,
    ]);

    const soaType = startOfAuth.type;
    let action;
    if (soaType === types.LOGIN) {
      const { username, password } = startOfAuth;
      action = yield fork(login, username, password);
    } else if (soaType === types.CHECK_COOKIES) {
      action = yield fork(checkCookes);
    } else if (soaType === types.REGISTER) {
      yield fork(register, startOfAuth.user);
    }

    // auth functionality already started
    const stopAuth = yield take([
      types.LOGOUT,
      types.STOP_LOGIN,
      types.STOP_REGISTER,
    ]);

    const saType = stopAuth.type;
    if (saType === types.LOGOUT) yield call(logout);
    else if (saType === types.STOP_LOGIN) yield cancel(action);
    else if (saType === types.STOP_REGISTER) yield cancel(action);
  }
}

// waits for new password
export function* watchNewPassword() {}
