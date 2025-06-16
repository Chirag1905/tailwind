import { call, put, takeLatest } from "redux-saga/effects";
import {
  getSingleCourseRegisterFailure,
  getSingleCourseRegisterRequest,
  getSingleCourseRegisterSuccess,

  postSingleCourseRegisterFailure,
  postSingleCourseRegisterRequest,
  postSingleCourseRegisterSuccess,

  getCourseRegisterFailure,
  getCourseRegisterRequest,
  getCourseRegisterSuccess,

  postCourseRegisterFailure,
  postCourseRegisterRequest,
  postCourseRegisterSuccess,
} from "./courseRegisterSlice";

import {
  getSingleCourseRegister,
  postSingleCourseRegister,
  
  getCourseRegister,
  postCourseRegister,
} from "./courseRegisterApi";

function* getSingleCourseRegisterSaga(action) {
  try {
    const response = yield call(getSingleCourseRegister, action.payload);
    yield put(getSingleCourseRegisterSuccess(response.data));
  } catch (error) {
    yield put(getSingleCourseRegisterFailure(error.message));
  }
}

function* postSingleCourseRegisterSaga(action) {
  try {
    const response = yield call(postSingleCourseRegister, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(postSingleCourseRegisterSuccess(response.data));
      yield put(
        getSingleCourseRegisterRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postSingleCourseRegisterFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postSingleCourseRegisterFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

function* getCourseRegisterSaga(action) {
  try {
    const response = yield call(getCourseRegister, action.payload);
    yield put(getCourseRegisterSuccess(response.data));
  } catch (error) {
    yield put(getCourseRegisterFailure(error.message));
  }
}

function* postCourseRegisterSaga(action) {
  try {
    const response = yield call(postCourseRegister, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(postCourseRegisterSuccess(response.data));
      yield put(
        getCourseRegisterRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postCourseRegisterFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postCourseRegisterFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

export default function* courseRegisterSaga() {
  yield takeLatest(getSingleCourseRegisterRequest.type, getSingleCourseRegisterSaga);
  yield takeLatest(postSingleCourseRegisterRequest.type, postSingleCourseRegisterSaga);
  yield takeLatest(getCourseRegisterRequest.type, getCourseRegisterSaga);
  yield takeLatest(postCourseRegisterRequest.type, postCourseRegisterSaga);
}
