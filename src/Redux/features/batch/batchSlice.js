import { createSlice } from "@reduxjs/toolkit";

const createAsyncReducers = (prefix, stateKey) => ({
  [`${prefix}Request`]: (state) => {
    state.loading = true;
    state.error = null;
    state[stateKey] = null;
  },
  [`${prefix}Success`]: (state, action) => {
    state[stateKey] = action.payload;
    state.loading = false;
  },
  [`${prefix}Failure`]: (state, action) => {
    state.error = action.payload;
    state.loading = false;
    state[stateKey] = null;
  },
});

const batchSlice = createSlice({
  name: "batch",
  initialState: {
    batchData: null,
    batchDataPagination: null,
    batchDataFetch: null,
    batchPostData: null,
    batchPutData: null,
    loading: false,
    error: null,
  },
  reducers: {
    ...createAsyncReducers("getBatch", "batchData"),
    ...createAsyncReducers("getBatchPagination", "batchDataPagination"),
    ...createAsyncReducers("getBatchFetch", "batchDataFetch"),
    ...createAsyncReducers("postBatch", "batchPostData"),
    ...createAsyncReducers("putBatch", "batchPutData"),
  },
});

// Now these exports will match your original names
export const {
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
} = batchSlice.actions;

export default batchSlice.reducer;