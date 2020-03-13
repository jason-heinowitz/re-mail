import * as types from '../constants/emailTypes';

export const getEmailSuccess = (data) => ({
  type: types.GET_EMAILS_SUCCESS,
  data,
});

export const getEmailFailed = () => ({
  type: types.GET_EMAILS_FAILED,
});

export const sendEmailSuccess = () => ({
  type: types.SEND_EMAIL_SUCCESS,
});

export const sendEmailFailed = () => ({
  type: types.SEND_EMAIL_FAILED,
});

export const deleteEmailSuccess = () => ({
  type: types.DELETE_EMAIL_SUCCESS,
});

export const deleteEmailFailed = () => ({
  type: types.DELETE_EMAIL_FAILED,
});
