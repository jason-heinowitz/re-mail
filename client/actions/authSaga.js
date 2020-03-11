import * as types from '../constants/authTypesSaga';

export const login = () => ({
  type: types.LOGIN,
});

export const checkCookies = () => ({
  type: types.CHECK_COOKIES,
});

export const register = () => ({
  type: types.REGISTER,
});

export const logout = () => ({
  type: types.LOGOUT,
});
