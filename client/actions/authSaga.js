import * as types from '../constants/authTypesSaga';

export const login = ({ username, password }) => ({
  type: types.LOGIN,
  username,
  password,
});

export const checkCookies = () => ({
  type: types.CHECK_COOKIES,
});

export const register = (user) => ({
  type: types.REGISTER,
  user,
});

export const logout = () => ({
  type: types.LOGOUT,
});
