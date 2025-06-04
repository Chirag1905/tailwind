import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/utils/modalSlice";
import campusGroupReducer from "./features/campusGroup/campusGroupSlice";
import campusReducer from "./features/campus/campusSlice";

const appReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  campusGroup: campusGroupReducer,
  campus: campusReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;