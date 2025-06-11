import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/utils/modalSlice";
import campusGroupReducer from "./features/campusGroup/campusGroupSlice";
import campusReducer from "./features/campus/campusSlice";
import customizationReducer from "./features/customization/customizationSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// Nested persist config only for campusGroup.campusGroupFormData
const campusGroupPersistConfig = {
  key: "campusGroup",
  storage,
  whitelist: ["campusGroupFormData"], // persist only this field
};

// Nested persist config only for campus.campusFormData
const campusPersistConfig = {
  key: "campus",
  storage,
  whitelist: ["campusFormData"], // persist only this field
};

const persistedCampusGroupReducer = persistReducer(
  campusGroupPersistConfig,
  campusGroupReducer
);

const persistedCampusReducer = persistReducer(
  campusPersistConfig,
  campusReducer
);

const appReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  campusGroup: persistedCampusGroupReducer,
  campus: persistedCampusReducer,
  customization: customizationReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;