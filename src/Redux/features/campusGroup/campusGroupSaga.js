import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCampusGroupRequest,
  getCampusGroupSuccess,
  getCampusGroupFailure,

  getCampusGroupPaginationRequest,
  getCampusGroupPaginationSuccess,
  getCampusGroupPaginationFailure,

  getCampusGroupFetchRequest,
  getCampusGroupFetchSuccess,
  getCampusGroupFetchFailure,

  postCampusGroupRequest,
  postCampusGroupSuccess,
  postCampusGroupFailure,

  putCampusGroupSuccess,
  putCampusGroupFailure,
  putCampusGroupRequest,
} from "./campusGroupSlice";
import {
  getCampusGroup,
  getCampusGroupPagination,
  getCampusGroupFetch,
  postCampusGroup,
  putCampusGroup,
} from "./campusGroupApi";

function* getCampusGroupSaga(action) {
  try {
    const response = yield call(getCampusGroup, action.payload);
    yield put(getCampusGroupSuccess(response.data));
  } catch (error) {
    yield put(getCampusGroupFailure(error.message));
  }
}

function* getCampusGroupPaginationSaga(action) {
  try {
    const response = yield call(getCampusGroupPagination, action.payload);
    yield put(getCampusGroupPaginationSuccess(response.data));
  } catch (error) {
    yield put(getCampusGroupPaginationFailure(error.message));
  }
}

function* getCampusGroupFetchSaga(action) {
  try {
    const response = yield call(getCampusGroupFetch, action.payload);
    yield put(getCampusGroupFetchSuccess(response.data));
  } catch (error) {
    yield put(getCampusGroupFetchFailure(error.message));
  }
}

function* postCampusGroupSaga(action) {
  try {
    const response = yield call(postCampusGroup, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(postCampusGroupSuccess(response.data));
      yield put(
        getCampusGroupPaginationRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true, searchFilter: "" },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postCampusGroupFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postCampusGroupFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

// Add new saga for updating campus data
function* putCampusGroupSaga(action) {
  try {
    const response = yield call(putCampusGroup, action.payload);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(putCampusGroupSuccess(response.data));
      yield put(
        getCampusGroupPaginationRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true, searchFilter: "" },
        })
      );
    } else {
      yield put(
        putCampusGroupFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    yield put(
      putCampusGroupFailure({
        message: error,
        error: [],
      })
    );
  }
}

export default function* campusGroupSaga() {
  yield takeLatest(getCampusGroupRequest.type, getCampusGroupSaga);
  yield takeLatest(getCampusGroupPaginationRequest.type, getCampusGroupPaginationSaga);
  yield takeLatest(getCampusGroupFetchRequest.type, getCampusGroupFetchSaga);
  yield takeLatest(postCampusGroupRequest.type, postCampusGroupSaga);
  yield takeLatest(putCampusGroupRequest.type, putCampusGroupSaga);
}
