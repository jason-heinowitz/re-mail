import { takeEvery, call } from 'redux-saga/effects';
import * as actions from '../actions/emailActions';
import * as types from '../constants/sagaTypes';

function* getEmails() {
  const response = yield call(fetch, '/api/emails');
  const emails = yield call([response, 'json']);
  console.log(emails);
}

export function* watchEmails() {
  yield takeEvery(types.GET_EMAILS, getEmails);
}

export function* x() {}
