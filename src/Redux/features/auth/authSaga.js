import { call, put, takeLatest } from "redux-saga/effects";
import { fetchData, forgotPass, resetPass, permanentPass, signIn, signOut } from "./authApi";
import {
  signInRequest,
  signInSuccess,
  signInFailure,

  signOutRequest,
  signOutSuccess,
  signOutFailure,

  permanentPassRequest,
  permanentPassSuccess,
  permanentPassFailure,

  forgotPassRequest,
  forgotPassFailure,
  forgotPassSuccess,

  resetPassRequest,
  resetPassFailure,
  resetPassSuccess,

  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} from "./authSlice";

function* signInSaga(action) {
  try {
    const response = yield call(signIn, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(signInSuccess(response.data));
    } else {
      yield put(signInFailure(response.status))
    }
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

// function* signOutSaga() {
//   yield call(signOut);
//   yield put(signOutSuccess());
// }

function* permanentPassSaga(action) {
  try {
    const response = yield call(permanentPass, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(permanentPassSuccess(response.status));
    } else {
      yield put(permanentPassFailure(response.status))
    }
  } catch (error) {
    yield put(permanentPassFailure(error.status));
  }
}

function* forgotPassSaga(action) {
  try {
    const response = yield call(forgotPass, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(forgotPassSuccess(response.status));
    } else {
      yield put(forgotPassFailure(response.status))
    }
  } catch (error) {
    yield put(forgotPassFailure(error.status));
  }
}

function* resetPassSaga(action) {
  try {
    const response = yield call(resetPass, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(resetPassSuccess(response.data));
    } else {
      yield put(resetPassFailure(response.message))
    }
  } catch (error) {
    yield put(resetPassFailure(error.message));
  }
}

function* fetchDataSaga(action) {
  try {
    const response = yield call(fetchData, action.payload);
    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(signInRequest.type, signInSaga);
  // yield takeLatest(signOutSuccess.type, signOutSaga);
  yield takeLatest(permanentPassRequest.type, permanentPassSaga);
  yield takeLatest(forgotPassRequest.type, forgotPassSaga);
  yield takeLatest(resetPassRequest.type, resetPassSaga);
  yield takeLatest(fetchDataRequest.type, fetchDataSaga);
}
