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

const campusSlice = createSlice({
  name: "campus",
  initialState: {
    campusData: null,
    campusPaginationData: null,
    campusFetchData: null,
    campusPostData: null,
    campusPutData: null,
    loading: false,
    error: null,
  },
  reducers: {
    ...createAsyncReducers("getCampus", "campusData"),
    ...createAsyncReducers("getCampusPagination", "campusPaginationData"),
    ...createAsyncReducers("getCampusFetch", "campusFetchData"),
    ...createAsyncReducers("postCampus", "campusPostData"),
    ...createAsyncReducers("putCampus", "campusPutData"),
  },
});

// Now these exports will match your original names
export const {
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

  putCampusRequest,
  putCampusSuccess,
  putCampusFailure,
} = campusSlice.actions;

export default campusSlice.reducer;