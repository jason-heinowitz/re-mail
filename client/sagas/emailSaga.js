import { takeEvery, take, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as actions from '../actions/emailActions';
import * as types from '../constants/sagaTypes';

function* getEmails() {
  const response = yield call(fetch, '/api/emails');
  const emails = yield call([response, 'json']);
  if (response.status === 200) {
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
    yield put(push('/emails'));
  } else yield put(actions.sef());
}

export function* watchSend() {
  while (true) {
    const { to, body } = yield take(types.SEND_EMAIL);
    yield call(sendEmail, to, body);
  }
}

function* deleteEmail(id) {
  const response = yield call(fetch, '/api/email', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  console.log(response.status);
  if (response.status === 200) {
    // yield put(actions.des());
    yield put(push('/'));
    yield put(push('/emails'));
  } else yield put(actions.def());
}

export function* watchDelete() {
  while (true) {
    const { id } = yield take(types.DELETE_EMAIL);
    yield call(deleteEmail, id);
  }
}
