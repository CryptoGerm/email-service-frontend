import { takeEvery, put, call, all } from 'redux-saga/effects';

import {
  runLoader,
  stopLoader,
  updateGlobalUser,
} from '../../state/reducers/App';

import { actions } from './Reducer';
import { loginAPI, loginGoogleAPI } from './API';

export function* loginWorker({ payload }) {
  yield put(runLoader());
  try {
    const response = yield call(loginAPI, payload);
    yield call([localStorage, 'setItem'], 'token', response.data.token);
    yield put(actions.loginSuccess(response));
    yield put(updateGlobalUser(response));
    yield put(stopLoader());
  } catch (error) {
    yield put(actions.loginFailure(error.response));
    yield put(stopLoader());
  }
}
export function* loginGoogleWorker({ payload }) {
  yield put(runLoader());
  try {
    const response = yield call(loginGoogleAPI, payload);
    yield call([localStorage, 'setItem'], 'token', response.data.token);
    yield put(actions.loginGoogleSuccess(response));
    yield put(updateGlobalUser(response));
    yield put(stopLoader());
  } catch (error) {
    yield put(actions.loginGoogleFailure(error.response));
    yield put(stopLoader());
  }
}

export default function* loginSaga() {
  yield all([
    yield takeEvery(actions.login.type, loginWorker),
    yield takeEvery(actions.loginGoogle.type, loginGoogleWorker),
  ]);
}
