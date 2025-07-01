import { call, put, takeLatest } from "redux-saga/effects";

import {
    getApplicationFormId,
    getApplicationFormTemplate,
    getApplicationFormStatus,

    postApplicationFormTemplate,
    postApplicationFormStatus,
    postApplicationFormCustomSection,

    putApplicationFormTemplate,
    putApplicationFormStatus,
} from "./applicationFormApi";
import {
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

} from "./applicationFormSlice";

function* getApplicationFormIdSaga(action) {
    try {
        const response = yield call(getApplicationFormId, action.payload);
        yield put(getApplicationFormIdSuccess(response.data));
    } catch (error) {
        yield put(getApplicationFormIdFailure(error.message));
    }
}

function* getApplicationFormTemplateSaga(action) {
    try {
        const response = yield call(getApplicationFormTemplate, action.payload);
        yield put(getApplicationFormTemplateSuccess(response.data));
    } catch (error) {
        yield put(getApplicationFormTemplateFailure(error.message));
    }
}

function* getApplicationFormStatusSaga(action) {
    try {
        const response = yield call(getApplicationFormStatus, action.payload);
        yield put(getApplicationFormStatusSuccess(response.data));
    } catch (error) {
        yield put(getApplicationFormStatusFailure(error.message));
    }
}

function* postApplicationFormTemplateSaga(action) {
    try {
        const response = yield call(postApplicationFormTemplate, action.payload);
        yield put(postApplicationFormTemplateSuccess(response.data));
    } catch (error) {
        yield put(postApplicationFormTemplateFailure(error.message));
    }
}

function* postApplicationFormStatusSaga(action) {
    try {
        const response = yield call(postApplicationFormStatus, action.payload);
        yield put(postApplicationFormStatusSuccess(response.data));
    } catch (error) {
        yield put(postApplicationFormStatusFailure(error.message));
    }
}

function* postApplicationFormCustomSectionSaga(action) {
    try {
        const response = yield call(postApplicationFormCustomSection, action.payload);
        yield put(postApplicationFormCustomSectionSuccess(response.data));
    } catch (error) {
        yield put(postApplicationFormCustomSectionFailure(error.message));
    }
}

function* putApplicationFormTemplateSaga(action) {
    try {
        const response = yield call(putApplicationFormTemplate, action.payload);
        yield put(putApplicationFormTemplateSuccess(response.data));
    } catch (error) {
        yield put(putApplicationFormTemplateFailure(error.message));
    }
}

function* putApplicationFormStatusSaga(action) {
    try {
        const response = yield call(putApplicationFormStatus, action.payload);
        yield put(putApplicationFormStatusSuccess(response.data));
    } catch (error) {
        yield put(putApplicationFormStatusFailure(error.message));
    }
}

export default function* academicYearSaga() {
    yield takeLatest(getApplicationFormIdRequest.type, getApplicationFormIdSaga);
    yield takeLatest(getApplicationFormTemplateRequest.type, getApplicationFormTemplateSaga);
    yield takeLatest(getApplicationFormStatusRequest.type, getApplicationFormStatusSaga);

    yield takeLatest(postApplicationFormTemplateRequest.type, postApplicationFormTemplateSaga);
    yield takeLatest(postApplicationFormStatusRequest.type, postApplicationFormStatusSaga);
    yield takeLatest(postApplicationFormCustomSectionRequest.type, postApplicationFormCustomSectionSaga);

    yield takeLatest(putApplicationFormTemplateRequest.type, putApplicationFormTemplateSaga);
    yield takeLatest(putApplicationFormStatusRequest.type, putApplicationFormStatusSaga);
}
