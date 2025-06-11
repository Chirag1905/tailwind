import { call, put, takeLatest } from "redux-saga/effects";
import { getCourseRegisterFailure, getCourseRegisterRequest, getCourseRegisterSuccess, postCourseRegisterFailure, postCourseRegisterRequest, postCourseRegisterSuccess } from "./courseRegisterSlice";
import { getCourseRegister, postCourseRegister } from "./courseRegisterApi";

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
  yield takeLatest(getCourseRegisterRequest.type, getCourseRegisterSaga);
  yield takeLatest(postCourseRegisterRequest.type, postCourseRegisterSaga);
}
