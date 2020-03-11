import { take, fork, cancel, call } from 'redux-saga/effects';

import * as types from '../constants/authTypesSaga';
import * as actions from '../actions/auth';

// doers
function* login(username, password) {}

function* checkCookes() {}

function* register() {}

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
    } else if (soaType === types.REGISTER) yield fork(register);

    // auth functionality already started
    const stopAuth = yield take([types.LOGOUT, types.STOP_LOGIN]);

    const saType = stopAuth.type;
    if (saType === types.LOGOUT) yield call(logout);
    else if (saType === types.STOP_LOGIN) cancel(action);
  }
}

// waits for new password
export function* watchNewPassword() {}
