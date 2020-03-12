import * as types from '../constants/emailTypesSaga';

export const getEmails = () => ({
  type: types.GET_EMAILS,
});

export const sendEmail = ({ to, body }) => ({
  type: types.SEND_EMAIL,
  to,
  body,
});

export const deleteEmail = (id) => ({
  type: types.DELETE_EMAIL,
  id,
});
