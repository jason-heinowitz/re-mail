import { take, call, put, fork, cancelled, cancel } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as actions from '../actions/loginActions';
import * as types from '../constants/sagaTypes';

function* authLogin(username, password) {
  try {
    const response = yield call(fetch, '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response !== 200) {
      if (response.status !== 200) {
        yield put({ type: types.STOP_LOGIN });
      } else {
        yield put(actions.loginSuccess());
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    if (yield cancelled()) {
      console.log('Login cacelled by user.');
    }
  }
}

function* checkCookies() {
  try {
    const response = yield call(fetch, '/auth/check');
    if (response.status === 200) {
      yield put(actions.loginSuccess());
    } else yield put({ type: types.STOP_LOGIN });
  } catch (e) {
    console.log(e);
  } finally {
    if (yield cancelled()) {
      console.log('Cookie check cancelled by user.');
    }
  }
}

function* clearAuth() {
  try {
    yield call(fetch, '/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(actions.logoutSuccess());
  } catch (e) {
    console.log(e);
  } finally {
    if (yield cancelled()) {
      console.log('Clear auth cancelled by user.');
    }
  }
}

export function* watchAuth() {
  while (true) {
    const initRes = yield take([types.LOGIN, types.CHECK]);

    let action;
    if (initRes.type === types.LOGIN) {
      // check username password when entered
      const { username, password } = initRes;

      // fork is non-blocking, allowing STOP_LOGIN to be called from both in and out of authLogin
      action = yield fork(authLogin, username, password);
    } else if (initRes.type === types.CHECK) {
      // run instead if user already has cookies
      action = yield fork(checkCookies);
    }

    // WAIT FOR LOGOUT OR LOGIN ERROR
    const loa = yield take([types.LOGOUT, types.STOP_LOGIN]);
    if (loa.type === types.LOGOUT) {
      // run when user manually logs out
    } else if (loa.type === types.STOP_LOGIN) {
      // clean up when log in fails
      cancel(action);
      yield put(actions.loginFail());
    }
    yield call(clearAuth);
  }
}

function* register({ firstname, lastname, username, password }) {
  const response = yield call(fetch, '/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname,
      lastname,
      username,
      password,
    }),
  });

  if (response.status === 200) {
    yield put(actions.regSuccess());
  } else yield put(actions.regFail());
}

export function* watchRegister() {
  while (true) {
    const user = yield take(types.REGISTER);
    yield call(register, user.user);
  }
}

function* editPassword({ oldPassword, newPassword }) {
  try {
    const res = yield call(fetch, '/api/check');

    if (res.status !== 200) yield put({ type: types.STOP_PASSWORD });
    const { username } = yield call([res, 'json']);

    const response = yield call(fetch, '/auth/checkLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password: oldPassword,
      }),
    });

    if (response.status !== 200) yield put({ type: types.STOP_PASSWORD });
    else {
      // change password after all checks pass
      const finResponse = yield call(fetch, '/auth/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          newPassword,
        }),
      });

      const fr = yield call([finResponse, 'json']);
      console.log(fr);
      yield put({ type: types.PASSWORD_GOOD });
      yield put(push('/emails'));
    }
  } catch (e) {
    console.log(e);
  } finally {
    if (yield cancelled()) {
      console.log('Login cacelled by user.');
    }
  }
}

export function* watchPasswordChange() {
  while (true) {
    const { passwords } = yield take(types.CHANGE_PASSWORD);
    const action = yield fork(editPassword, passwords);

    const waiting = yield take([types.STOP_PASSWORD, types.PASSWORD_GOOD]);
    if (waiting.type === types.STOP_PASSWORD) {
      cancel(action);
    }
  }
}
