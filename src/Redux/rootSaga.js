import { all } from "redux-saga/effects";
import authSaga from "./features/auth/authSaga";
import campusGroupSaga from "./features/campusGroup/campusGroupSaga";
import campusSaga from "./features/campus/campusSaga";
import customizationSaga from "./features/customization/customizationSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    campusGroupSaga(),
    campusSaga(),
    customizationSaga()
  ]);
}
