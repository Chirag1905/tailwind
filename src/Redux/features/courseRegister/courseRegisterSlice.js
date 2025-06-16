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

const courseRegisterSlice = createSlice({
  name: "courseRegister",
  initialState: {
    courseRegisterData: null,
    courseRegisterPostData: null,
    loading: false,
    error: null,
  },
  reducers: {
    ...createAsyncReducers("getSingleCourseRegister", "courseRegisterData"),
    ...createAsyncReducers("postSingleCourseRegister", "courseRegisterPostData"),
    ...createAsyncReducers("getCourseRegister", "courseRegisterData"),
    ...createAsyncReducers("postCourseRegister", "courseRegisterPostData"),
  },
});

// Now these exports will match your original names
export const {
  getSingleCourseRegisterRequest,
  getSingleCourseRegisterSuccess,
  getSingleCourseRegisterFailure,

  postSingleCourseRegisterRequest,
  postSingleCourseRegisterSuccess,
  postSingleCourseRegisterFailure,

  getCourseRegisterRequest,
  getCourseRegisterSuccess,
  getCourseRegisterFailure,

  postCourseRegisterRequest,
  postCourseRegisterSuccess,
  postCourseRegisterFailure,

} = courseRegisterSlice.actions;

export default courseRegisterSlice.reducer;