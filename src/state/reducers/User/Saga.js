import { takeLatest, put, all, call } from 'redux-saga/effects';

import { stopLoader, runLoader } from '../App';
import { getUserDetailsAPI } from './API';

import { actions } from '.';

export function* getUserDetailsWorker({ payload }) {
  yield put(runLoader());
  try {
    const response = yield call(getUserDetailsAPI, payload);
    yield put(actions.getUserDetailsSuccess(response));

    yield put(stopLoader());
  } catch (error) {
    yield put(actions.getUserDetailsFailure(error.response));
    yield put(stopLoader());
  }
}

export default function* UserSaga() {
  yield all([takeLatest(actions.getUserDetails.type, getUserDetailsWorker)]);
}
