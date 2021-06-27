import { takeEvery, put, call, all } from 'redux-saga/effects';

import { runLoader, stopLoader } from '../../state/reducers/App';

import { actions } from './Reducer';
import { registerAPI } from './API';

export function* registerWorker({ payload }) {
  yield put(runLoader());
  try {
    const response = yield call(registerAPI, payload);
    yield put(actions.registerSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    yield put(actions.registerFailure(error.response));
    yield put(stopLoader());
  }
}

export default function* registerSaga() {
  yield all([yield takeEvery(actions.register.type, registerWorker)]);
}
