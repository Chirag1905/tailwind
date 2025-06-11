import { call, put, takeLatest } from "redux-saga/effects";
import {
  getBatchRequest,
  getBatchSuccess,
  getBatchFailure,

  getBatchPaginationRequest,
  getBatchPaginationSuccess,
  getBatchPaginationFailure,

  getBatchFetchRequest,
  getBatchFetchSuccess,
  getBatchFetchFailure,

  postBatchRequest,
  postBatchSuccess,
  postBatchFailure,

  putBatchRequest,
  putBatchSuccess,
  putBatchFailure,
} from "./batchSlice";

import {
  getBatch,
  getBatchPagination,
  getBatchFetch,
  postBatch,
  putBatch,
} from "./batchApi";

function* getBatchSaga(action) {
  try {
    const response = yield call(getBatch, action.payload);
    yield put(getBatchSuccess(response.data));
  } catch (error) {
    yield put(getBatchFailure(error.message));
  }
}

function* getBatchPaginationSaga(action) {
  try {
    const response = yield call(getBatchPagination, action.payload);
    yield put(getBatchPaginationSuccess(response.data));
  } catch (error) {
    yield put(getBatchPaginationFailure(error.message));
  }
}

function* getBatchFetchSaga(action) {
  try {
    const response = yield call(getBatchFetch, action.payload);
    yield put(getBatchFetchSuccess(response.data));
  } catch (error) {
    yield put(getBatchFetchFailure(error.message));
  }
}

function* postBatchSaga(action) {
  try {
    const response = yield call(postBatch, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(postBatchSuccess(response.data));
      yield put(
        getBatchRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postBatchFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postBatchFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

// Add new saga for updating campus data
function* putBatchSaga(action) {
  try {
    const response = yield call(putBatch, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(putBatchSuccess(response.data));
      yield put(
        getBatchRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      yield put(
        putBatchFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    yield put(
      putBatchFailure({
        message: error,
        error: [],
      })
    );
  }
}

export default function* batchSaga() {
  yield takeLatest(getBatchRequest.type, getBatchSaga);
  yield takeLatest(getBatchPaginationRequest.type, getBatchPaginationSaga);
  yield takeLatest(getBatchFetchRequest.type, getBatchFetchSaga);
  yield takeLatest(postBatchRequest.type, postBatchSaga);
  yield takeLatest(putBatchRequest.type, putBatchSaga);
}
