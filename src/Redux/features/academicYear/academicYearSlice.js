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

const academicYearSlice = createSlice({
  name: "academicYear",
  initialState: {
    academicYearData: null,
    academicYearDataPagination: null,
    academicYearDataFetch: null,
    academicYearPostData: null,
    academicYearPutData: null,
    selectedAcademicYear: null,
    loading: false,
    error: null,
  },
  reducers: {
    ...createAsyncReducers("getAcademicYear", "academicYearData"),
    ...createAsyncReducers("getAcademicYearPagination", "academicYearDataPagination"),
    ...createAsyncReducers("getAcademicYearFetch", "academicYearDataFetch"),
    ...createAsyncReducers("postAcademicYear", "academicYearPostData"),
    ...createAsyncReducers("putAcademicYear", "academicYearPutData"),
    setSelectedAcademicYear: (state, action) => {
      state.selectedAcademicYear = action.payload;
    },
  },
});

// Now these exports will match your original names
export const {
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

  setSelectedAcademicYear,
} = academicYearSlice.actions;

export default academicYearSlice.reducer;