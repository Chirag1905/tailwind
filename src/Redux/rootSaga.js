import { all } from "redux-saga/effects";
import authSaga from "./features/auth/authSaga";
import academicYearSaga from "./features/academicYear/academicYearSaga";
import courseSaga from "./features/course/courseSaga";
import batchSaga from "./features/batch/batchSaga";
import courseRegister from "./features/courseRegister/courseRegisterSaga";
import customizationSaga from "./features/customization/customizationSaga";
import applicationFormSaga from "./features/applicationForm/applicationFormSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    academicYearSaga(),
    courseSaga(),
    batchSaga(),
    courseRegister(),
    customizationSaga(),
    applicationFormSaga(),
  ]);
}
