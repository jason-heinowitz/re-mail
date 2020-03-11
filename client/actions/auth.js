import * as types from '../constants/authTypes';

// login
export const loginStarted = () => ({
  type: types.LOGIN_STARTED,
});

export const loginComplete = () => ({
  type: types.LOGIN_COMPLETE,
});

export const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

export const loginFailed = () => ({
  type: types.LOGIN_FAILED,
});

// logout
export const logoutStarted = () => ({
  type: types.LOGOUT_STARTED,
});

export const logoutComplete = () => ({
  type: types.LOGOUT_COMPLETE,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const logoutFailed = () => ({
  type: types.LOGOUT_FAILED,
});

// register
export const registerStarted = () => ({
  type: types.REGISTER_STARTED,
});

export const registerComplete = () => ({
  type: types.REGISTER_COMPLETE,
});

export const registerSuccess = () => ({
  type: types.REGISTER_SUCCESS,
});

export const registerFailed = () => ({
  type: types.REGISTER_FAILED,
});
