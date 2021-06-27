import { takeEvery, put, call, all } from 'redux-saga/effects';

import { runLoader, stopLoader } from '../../state/reducers/App';

import { actions } from './Reducer';
import {
  createMailAPI,
  listScheduledMailsAPI,
  listSentMailsAPI,
  listSentScheduledMailsAPI,
  sendMailAPI,
} from './API';

export function* createMailWorker({ payload }) {
  yield put(runLoader());
  try {
    const response = yield call(createMailAPI, payload);
    yield put(actions.createMailSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    yield put(actions.createMailFailure(error.response));
    yield put(stopLoader());
  }
}
export function* sendMailWorker({ payload }) {
  yield put(runLoader());
  try {
    const response = yield call(sendMailAPI, payload);
    yield put(actions.sendMailSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    yield put(actions.sendMailFailure(error.response));
    yield put(stopLoader());
  }
}
export function* listScheduledMailsWorker({ payload }) {
  yield put(runLoader());
  try {
    const response = yield call(listScheduledMailsAPI, payload);
    yield put(actions.listScheduledMailsSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    yield put(actions.listScheduledMailsFailure(error.response));
    yield put(stopLoader());
  }
}
export function* listSentMailsWorker({ payload }) {
  yield put(runLoader());
  try {
    const response = yield call(listSentMailsAPI, payload);
    yield put(actions.listSentMailsSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    yield put(actions.listSentMailsFailure(error.response));
    yield put(stopLoader());
  }
}
export function* listSentScheduledMailsWorker({ payload }) {
  yield put(runLoader());
  try {
    const response = yield call(listSentScheduledMailsAPI, payload);
    yield put(actions.listSentScheduledMailsSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    yield put(actions.listSentScheduledMailsFailure(error.response));
    yield put(stopLoader());
  }
}

export default function* mailSaga() {
  yield all([
    yield takeEvery(actions.createMail.type, createMailWorker),
    yield takeEvery(actions.sendMail.type, sendMailWorker),
    yield takeEvery(actions.listScheduledMails.type, listScheduledMailsWorker),
    yield takeEvery(actions.listSentMails.type, listSentMailsWorker),
    yield takeEvery(
      actions.listSentScheduledMails.type,
      listSentScheduledMailsWorker,
    ),
  ]);
}
