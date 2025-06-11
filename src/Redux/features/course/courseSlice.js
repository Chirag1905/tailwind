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

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courseData: null,
    courseDataPagination: null,
    courseDataFetch: null,
    coursePostData: null,
    coursePutData: null,
    loading: false,
    error: null,
  },
  reducers: {
    ...createAsyncReducers("getCourse", "courseData"),
    ...createAsyncReducers("getCoursePagination", "courseDataPagination"),
    ...createAsyncReducers("getCourseFetch", "courseDataFetch"),
    ...createAsyncReducers("postCourse", "coursePostData"),
    ...createAsyncReducers("putCourse", "coursePutData"),
  },
});

// Now these exports will match your original names
export const {
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
} = courseSlice.actions;

export default courseSlice.reducer;