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

const applicationFormSlice = createSlice({
  name: "applicationForm",
  initialState: {
    applicationFormIdData: null,
    applicationFormTemplateData: null,
    applicationFormStatusData: null,

    applicationFormTemplatePostData: null,
    applicationFormStatusPostData: null,
    applicationFormSectionPostData: null,

    applicationFormTemplatePutData: null,
    applicationFormStatusPutData: null,

    loading: false,
    error: null,
  },
  reducers: {
    ...createAsyncReducers("getApplicationFormId", "applicationFormIdData"),
    ...createAsyncReducers("getApplicationFormTemplate", "applicationFormTemplateData"),
    ...createAsyncReducers("getApplicationFormStatus", "applicationFormStatusData"),

    ...createAsyncReducers("postApplicationFormTemplate", "applicationFormTemplatePostData"),
    ...createAsyncReducers("postApplicationFormStatus", "applicationFormStatusPostData"),
    ...createAsyncReducers("postApplicationFormCustomSection", "applicationFormSectionPostData"),

    ...createAsyncReducers("putApplicationFormTemplate", "applicationFormTemplatePutData"),
    ...createAsyncReducers("putApplicationFormStatus", "applicationFormStatusPutData"),
  },
});

// Now these exports will match your original names
export const {
  getApplicationFormIdRequest,
  getApplicationFormIdSuccess,
  getApplicationFormIdFailure,

  getApplicationFormTemplateRequest,
  getApplicationFormTemplateSuccess,
  getApplicationFormTemplateFailure,

  getApplicationFormStatusRequest,
  getApplicationFormStatusSuccess,
  getApplicationFormStatusFailure,

  postApplicationFormTemplateRequest,
  postApplicationFormTemplateSuccess,
  postApplicationFormTemplateFailure,

  postApplicationFormStatusRequest,
  postApplicationFormStatusSuccess,
  postApplicationFormStatusFailure,

  postApplicationFormCustomSectionRequest,
  postApplicationFormCustomSectionSuccess,
  postApplicationFormCustomSectionFailure,

  putApplicationFormTemplateRequest,
  putApplicationFormTemplateSuccess,
  putApplicationFormTemplateFailure,

  putApplicationFormStatusRequest,
  putApplicationFormStatusSuccess,
  putApplicationFormStatusFailure,

} = applicationFormSlice.actions;

export default applicationFormSlice.reducer;