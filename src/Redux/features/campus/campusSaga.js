import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCampusRequest,
  getCampusSuccess,
  getCampusFailure,

  getCampusPaginationRequest,
  getCampusPaginationSuccess,
  getCampusPaginationFailure,

  getCampusFetchRequest,
  getCampusFetchSuccess,
  getCampusFetchFailure,

  postCampusRequest,
  postCampusSuccess,
  postCampusFailure,

  putCampusSuccess,
  putCampusFailure,
  putCampusRequest,
} from "./campusSlice";
import {
  getCampus,
  getCampusPagination,
  getCampusFetch,
  postCampus,
  putCampus,
} from "./campusApi";

function* getCampusSaga(action) {
  try {
    const response = yield call(getCampus, action.payload);
    yield put(getCampusSuccess(response.data));
  } catch (error) {
    yield put(getCampusFailure(error.message));
  }
}

function* getCampusPaginationSaga(action) {
  try {
    const response = yield call(getCampusPagination, action.payload);
    yield put(getCampusPaginationSuccess(response.data));
  } catch (error) {
    yield put(getCampusPaginationFailure(error.message));
  }
}

function* getCampusFetchSaga(action) {
  try {
    const response = yield call(getCampusFetch, action.payload);
    yield put(getCampusFetchSuccess(response.data));
  } catch (error) {
    yield put(getCampusFetchFailure(error.message));
  }
}

function* postCampusSaga(action) {
  try {
    const response = yield call(postCampus, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(postCampusSuccess(response.data));
      yield put(
        getCampusRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true, searchFilter: "" },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postCampusFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postCampusFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

// Add new saga for updating campus data
function* putCampusSaga(action) {
  try {
    const response = yield call(putCampus, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(putCampusSuccess(response.data));
      yield put(
        getCampusRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true, searchFilter: "" },
        })
      );
    } else {
      yield put(
        putCampusFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    yield put(
      putCampusFailure({
        message: error,
        error: [],
      })
    );
  }
}

export default function* campusSaga() {
  yield takeLatest(getCampusRequest.type, getCampusSaga);
  yield takeLatest(getCampusPaginationRequest.type, getCampusPaginationSaga);
  yield takeLatest(getCampusFetchRequest.type, getCampusFetchSaga);
  yield takeLatest(postCampusRequest.type, postCampusSaga);
  yield takeLatest(putCampusRequest.type, putCampusSaga);
}
