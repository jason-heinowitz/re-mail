import * as types from '../constants/emailTypes';

export const ges = (emails) => ({
  type: types.GET_EMAILS_SUCCESS,
  emails,
});

export const gef = () => ({
  type: types.GET_EMAILS_FAIL,
});

export const ses = () => ({
  type: types.SEND_EMAIL_SUCCESS,
});

export const sef = () => ({
  type: types.SEND_EMAIL_FAIL,
});

export const des = () => ({
  type: types.DELETE_EMAIL_SUCCESS,
});

export const def = () => ({
  type: types.DELETE_EMAIL_FAIL,
});
