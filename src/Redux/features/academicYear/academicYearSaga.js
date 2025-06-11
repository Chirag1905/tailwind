import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAcademicYearRequest,
  getAcademicYearSuccess,
  getAcademicYearFailure,

  getAcademicYearPaginationRequest,
  getAcademicYearPaginationSuccess,
  getAcademicYearPaginationFailure,

  getAcademicYearFetchRequest,
  getAcademicYearFetchSuccess,
  getAcademicYearFetchFailure,

  postAcademicYearRequest,
  postAcademicYearSuccess,
  postAcademicYearFailure,

  putAcademicYearRequest,
  putAcademicYearSuccess,
  putAcademicYearFailure,
} from "./academicYearSlice";

import {
  getAcademicYear,
  getAcademicYearPagination,
  getAcademicYearFetch,
  postAcademicYear,
  putAcademicYear,
} from "./academicYearApi";

function* getAcademicYearSaga(action) {
  try {
    const response = yield call(getAcademicYear, action.payload);
    yield put(getAcademicYearSuccess(response.data));
  } catch (error) {
    yield put(getAcademicYearFailure(error.message));
  }
}

function* getAcademicYearPaginationSaga(action) {
  try {
    const response = yield call(getAcademicYearPagination, action.payload);
    yield put(getAcademicYearPaginationSuccess(response.data));
  } catch (error) {
    yield put(getAcademicYearPaginationFailure(error.message));
  }
}

function* getAcademicYearFetchSaga(action) {
  try {
    const response = yield call(getAcademicYearFetch, action.payload);
    yield put(getAcademicYearFetchSuccess(response.data));
  } catch (error) {
    yield put(getAcademicYearFetchFailure(error.message));
  }
}

function* postAcademicYearSaga(action) {
  try {
    const response = yield call(postAcademicYear, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(postAcademicYearSuccess(response.data));
      yield put(
        getAcademicYearPaginationRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postAcademicYearFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postAcademicYearFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

// Add new saga for updating campus data
function* putAcademicYearSaga(action) {
  try {
    const response = yield call(putAcademicYear, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(putAcademicYearSuccess(response.data));
      yield put(
        getAcademicYearPaginationRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      yield put(
        putAcademicYearFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    yield put(
      putAcademicYearFailure({
        message: error,
        error: [],
      })
    );
  }
}

export default function* academicYearSaga() {
  yield takeLatest(getAcademicYearRequest.type, getAcademicYearSaga);
  yield takeLatest(getAcademicYearPaginationRequest.type, getAcademicYearPaginationSaga);
  yield takeLatest(getAcademicYearFetchRequest.type, getAcademicYearFetchSaga);
  yield takeLatest(postAcademicYearRequest.type, postAcademicYearSaga);
  yield takeLatest(putAcademicYearRequest.type, putAcademicYearSaga);
}
