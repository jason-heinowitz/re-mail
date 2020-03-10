import { takeEvery, take, call, put } from 'redux-saga/effects';
import * as actions from '../actions/emailActions';
import * as types from '../constants/sagaTypes';

function* getEmails() {
  const response = yield call(fetch, '/api/emails');
  const emails = yield call([response, 'json']);
  if (response.status === 200) {
    console.log(emails);
    yield put(actions.ges(emails));
  } else yield put(actions.gef());
}

export function* watchEmails() {
  yield takeEvery(types.GET_EMAILS, getEmails);
}

function* sendEmail(to, body) {
  const response = yield call(fetch, '/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to,
      body,
    }),
  });

  if (response.status === 200) {
    yield put(actions.ses());
  } else yield put(actions.sef());
}

export function* watchSend() {
  while (true) {
    const { to, body } = yield take(types.SEND_EMAIL);
    yield call(sendEmail, to, body);
  }
}
