import * as types from '../constants/sagaTypes';

export const login = (username, password) => ({
  type: types.LOGIN,
  username,
  password,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const check = () => ({
  type: types.CHECK,
});
