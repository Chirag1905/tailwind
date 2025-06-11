import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCourseRequest,
  getCourseSuccess,
  getCourseFailure,

  getCoursePaginationRequest,
  getCoursePaginationSuccess,
  getCoursePaginationFailure,

  getCourseFetchRequest,
  getCourseFetchSuccess,
  getCourseFetchFailure,

  postCourseRequest,
  postCourseSuccess,
  postCourseFailure,

  putCourseRequest,
  putCourseSuccess,
  putCourseFailure,
} from "./courseSlice";

import {
  getCourse,
  getCoursePagination,
  getCourseFetch,
  postCourse,
  putCourse,
} from "./courseApi";

function* getCourseSaga(action) {
  try {
    const response = yield call(getCourse, action.payload);
    yield put(getCourseSuccess(response.data));
  } catch (error) {
    yield put(getCourseFailure(error.message));
  }
}

function* getCoursePaginationSaga(action) {
  try {
    const response = yield call(getCoursePagination, action.payload);
    yield put(getCoursePaginationSuccess(response.data));
  } catch (error) {
    yield put(getCoursePaginationFailure(error.message));
  }
}

function* getCourseFetchSaga(action) {
  try {
    const response = yield call(getCourseFetch, action.payload);
    yield put(getCourseFetchSuccess(response.data));
  } catch (error) {
    yield put(getCourseFetchFailure(error.message));
  }
}

function* postCourseSaga(action) {
  try {
    const response = yield call(postCourse, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(postCourseSuccess(response.data));
      yield put(
        getCoursePaginationRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postCourseFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postCourseFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

// Add new saga for updating campus data
function* putCourseSaga(action) {
  try {
    const response = yield call(putCourse, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(putCourseSuccess(response.data));
      yield put(
        getCoursePaginationRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      yield put(
        putCourseFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    yield put(
      putCourseFailure({
        message: error,
        error: [],
      })
    );
  }
}

export default function* courseSaga() {
  yield takeLatest(getCourseRequest.type, getCourseSaga);
  yield takeLatest(getCoursePaginationRequest.type, getCoursePaginationSaga);
  yield takeLatest(getCourseFetchRequest.type, getCourseFetchSaga);
  yield takeLatest(postCourseRequest.type, postCourseSaga);
  yield takeLatest(putCourseRequest.type, putCourseSaga);
}
