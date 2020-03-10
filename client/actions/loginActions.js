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
