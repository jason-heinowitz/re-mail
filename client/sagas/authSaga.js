import {
  take,
  takeLeading,
  fork,
  cancel,
  call,
  put,
  cancelled,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as types from '../constants/authTypesSaga';
import * as actions from '../actions/auth';
import * as flash from '../actions/flashSaga';

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
    yield put(flash.clear());
    yield put(
      flash.create({
        message: 'Log in successful!',
        group: 'success',
      })
    );
    yield put(push('/emails'));
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
  yield put(
    flash.create({
      message: 'Registration successful!',
      group: 'success',
    })
  );
  yield put(push('/emails'));
}

function* logout() {
  yield call(fetch, '/auth/logout', ac('POST'));
  yield put(actions.logoutSuccess());
  yield put(push('/login'));
}

function* changePassword({ newPassword, oldPassword }) {
  const getUsername = yield call(fetch, '/auth/self');

  if (getUsername.status !== 200) {
    yield put({ type: types.STOP_PASSWORD });
  }

  const ures = yield call([getUsername, 'json']);

  const username = ures;

  const passwordResponse = yield call(
    fetch,
    '/auth/newPassword',
    ac('POST', {
      username,
      password: oldPassword,
      newPassword,
    })
  );

  if (passwordResponse.status !== 200) {
    yield put({ type: types.STOP_PASSWORD });
  }

  yield put(actions.changePasswordSuccess());
  yield put(
    flash.create({
      message: 'Password change successful!',
      group: 'success',
    })
  );
  yield put({ type: types.PASSWORD_PASS });
  yield put({ type: types.LOGOUT });
}

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
    if (saType === types.LOGOUT) {
      yield call(logout);
      yield put(
        flash.create({
          message: 'Log out successful!',
          group: 'success',
        })
      );
    } else if (saType === types.STOP_LOGIN) yield cancel(action);
    else if (saType === types.STOP_REGISTER) yield cancel(action);
  }
}

// waits for new password
export function* watchNewPassword() {
  // yield takeLeading(types.CHANGE_PASSWORD, changePassword);

  while (true) {
    const ex = yield take(types.CHANGE_PASSWORD);
    const { newPassword, oldPassword } = ex;
    const action = yield fork(changePassword, { newPassword, oldPassword });

    const eb = yield take([types.STOP_PASSWORD, types.PASSWORD_PASS]);
    if (eb.type === types.STOP_PASSWORD) {
      cancel(action);
    }
  }
}
