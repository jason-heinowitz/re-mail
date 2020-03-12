import { takeEvery, put } from 'redux-saga/effects';

import * as types from '../constants/flashTypesSaga';
import * as actions from '../actions/flash';

function* addFlash({ message, group }) {
  yield put(actions.flashSuccess({ message, group }));
}

function* removeFlash({ index }) {
  // console.log('removing index ', index);

  yield put(actions.flashRemove(index));
}

function* removeFlashAll() {
  yield put(actions.flashRemoveAll());
}

export function* watchFlashCreate() {
  yield takeEvery(types.CREATE_MESSAGE, addFlash);
}

export function* watchFlashDelete() {
  yield takeEvery(types.DELETE_MESSAGE, removeFlash);
}

export function* flashAll() {
  yield takeEvery(types.DELETE_ALL, removeFlashAll);
}
