import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/utils/modalSlice";
import academicYearReducer from "./features/academicYear/academicYearSlice";
import courseReducer from "./features/course/courseSlice";
import batchReducer from "./features/batch/batchSlice";
import courseRegisterReducer from "./features/courseRegister/courseRegisterSlice";
import customizationReducer from "./features/customization/customizationSlice";
import applicationFormReducer from "./features/applicationForm/applicationFormSlice";

const appReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  academicYear: academicYearReducer,
  course: courseReducer,
  batch: batchReducer,
  courseRegister: courseRegisterReducer,
  customization: customizationReducer,
  applicationForm: applicationFormReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;