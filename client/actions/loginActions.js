import * as types from '../constants/loginTypes';

export const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

export const loginFail = () => ({
  type: types.LOGIN_FAIL,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCESS,
});

export const regSuccess = () => ({
  type: types.REGISTER_SUCCESS,
});

export const regFail = () => ({
  type: types.REGISTER_FAIL,
});
