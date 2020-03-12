import { takeEvery, takeLeading, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as types from '../constants/emailTypesSaga';
import * as actions from '../actions/email';

// helpers
const ac = (method, body) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

// doers
function* getEmails() {
  const getEmailResponse = yield call(fetch, '/api/emails');

  if (getEmailResponse.status !== 200) yield put(actions.getEmailFailed());
  else {
    const data = yield call([getEmailResponse, 'json']);
    yield put(actions.getEmailSuccess(data));
  }
}

function* sendEmail({ to, body }) {
  const sendEmailResponse = yield call(
    fetch,
    '/api/email',
    ac('POST', { to, body })
  );

  if (sendEmailResponse.status !== 200) {
    yield put(actions.sendEmailFailed());
  } else {
    yield put(actions.sendEmailSuccess());
    yield put(push('/emails'));
  }
}

function* deleteEmail({ id }) {
  const deleteEmailResponse = yield call(
    fetch,
    '/api/email',
    ac('DELETE', {
      id,
    })
  );

  if (deleteEmailResponse.status !== 200) {
    yield put(actions.deleteEmailFailed());
  } else {
    yield put(actions.deleteEmailSuccess());
    yield put({ type: types.GET_EMAILS });
  }
}

// watchers
export function* watchGet() {
  yield takeEvery(types.GET_EMAILS, getEmails);
}

export function* watchSend() {
  yield takeLeading(types.SEND_EMAIL, sendEmail);
}

export function* watchDelete() {
  yield takeLeading(types.DELETE_EMAIL, deleteEmail);
}
