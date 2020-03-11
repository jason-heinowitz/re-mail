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

export const register = (user) => ({
  type: types.REGISTER,
  user,
});

export const getEmails = () => ({
  type: types.GET_EMAILS,
});

export const sendEmail = ({ to, body }) => ({
  type: types.SEND_EMAIL,
  to,
  body,
});

export const delEmail = (id) => ({
  type: types.DELETE_EMAIL,
  id,
});

export const changePassword = (passwords) => ({
  type: types.CHANGE_PASSWORD,
  passwords,
});
