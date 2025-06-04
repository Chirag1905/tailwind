import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isTempPass: false,
  token: null,
  refreshToken: null,
  tokenExpiry: null,
  refreshTokenExpiry: null,

  // Sign in states
  signInData: null,
  signInLoading: false,
  signInError: null,

  // Forgot password states
  forgotPassData: null,
  forgotPassLoading: false,
  forgotPassError: null,

  // Permanent password states
  permPassData: null,
  permPassLoading: false,
  permPassError: null,

  // Reset password states
  resetPassData: null,
  resetPassLoading: false,
  resetPassError: null,

  // Sign out states
  signOutLoading: false,
  signOutError: null,

  // Fetch data states
  fetchData: null,
  fetchDataLoading: false,
  fetchDataError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sign in
    signInRequest(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.signInData = null;
      state.signInLoading = true;
      state.signInError = null;
    },
     signInSuccess(state, action) {
      const now = new Date().getTime();
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refresh_token;
      state.tokenExpiry = now + (action.payload.expires_in * 1000);
      state.refreshTokenExpiry = now + (action.payload.refresh_expires_in * 1000);
      // state.tokenExpiry = now + 10000;
      // state.refreshTokenExpiry = now + 30000;
      state.isTempPass = action.payload.requiresPasswordUpdate;
      state.signInData = action.payload;
      state.signInLoading = false;
    },
      refreshTokenSuccess(state) {
      state.token = state.refreshToken;
      state.tokenExpiry = state.refreshTokenExpiry;
    },
    signInFailure(state, action) {
      state.isAuthenticated = false;
      state.token = null;
      state.signInLoading = false;
      state.signInError = action.payload;
    },
    clearAuthState(state) {
      state.signInData = null;
      state.signInError = null;
      state.signInLoading = false;
    },

    // Sign out 
    signOutRequest(state) {
      state.signOutLoading = true;
      state.signOutError = null;
    },
    signOutSuccess(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.isTempPass = false;
      state.signInData = null;
      state.signOutLoading = false;
    },
    signOutFailure(state, action) {
      state.signOutLoading = false;
      state.signOutError = action.payload;
    },

    backToSignIn(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.isTempPass = false;
      state.signInData = null;
    },

    // Permanent Password
    permanentPassRequest(state) {
      state.permPassLoading = true;
      state.permPassData = null;
      state.permPassError = null;
    },
    permanentPassSuccess(state, action) {
      state.permPassLoading = false;
      state.permPassData = action.payload;
      state.isTempPass = false;
    },
    permanentPassFailure(state, action) {
      state.permPassLoading = false;
      state.permPassError = action.payload;
    },

    // Forgot Password
    forgotPassRequest(state) {
      state.forgotPassLoading = true;
      state.forgotPassData = null;
      state.forgotPassError = null;
    },
    forgotPassSuccess(state, action) {
      state.forgotPassLoading = false;
      state.forgotPassData = action.payload;
    },
    forgotPassFailure(state, action) {
      state.forgotPassLoading = false;
      state.forgotPassError = action.payload;
    },

    // Reset Password
    resetPassRequest(state) {
      state.resetPassLoading = true;
      state.resetPassData = null;
      state.resetPassError = null;
    },
    resetPassSuccess(state, action) {
      state.resetPassLoading = false;
      state.resetPassData = action.payload;
    },
    resetPassFailure(state, action) {
      state.resetPassLoading = false;
      state.resetPassError = action.payload;
    },

    // Fetch Data
    fetchDataRequest(state) {
      state.fetchDataLoading = true;
      state.fetchData = null;
      state.fetchDataError = null;
    },
    fetchDataSuccess(state, action) {
      state.fetchDataLoading = false;
      state.fetchData = action.payload.data;
    },
    fetchDataFailure(state, action) {
      state.fetchDataLoading = false;
      state.fetchDataError = action.payload;
    },
  },
});

export const {
  backToSignIn,

  signInRequest,
  signInSuccess,
  signInFailure,
  clearAuthState,

  signOutRequest,
  signOutSuccess,
  signOutFailure,

  refreshTokenSuccess,

  permanentPassRequest,
  permanentPassSuccess,
  permanentPassFailure,

  forgotPassRequest,
  forgotPassSuccess,
  forgotPassFailure,

  resetPassRequest,
  resetPassSuccess,
  resetPassFailure,

  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure
} = authSlice.actions;
export default authSlice.reducer;