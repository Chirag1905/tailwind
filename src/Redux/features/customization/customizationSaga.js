import { put, takeLatest, call } from 'redux-saga/effects';
import {
    fetchCustomizationRequest,
    fetchCustomizationSuccess,
    fetchCustomizationFailure,
    postCustomizationRequest,
    postCustomizationSuccess,
    postCustomizationFailure,
} from './customizationSlice';
import { getCustomization, postCustomization } from './customizationApi';

function* fetchCustomizationSaga(action) {
    try {
        const response = yield call(getCustomization, action.payload);
        yield put(fetchCustomizationSuccess(response.data));
    } catch (error) {
        yield put(fetchCustomizationFailure(error.message));
    }
}

function* postCustomizationSaga(action) {
    try {
        const response = yield call(postCustomization, action.payload);
        yield put(postCustomizationSuccess(postCustomization));
    } catch (error) {
        yield put(postCustomizationFailure(error.message));
    }
}

export default function* customizationSaga() {
    yield takeLatest(fetchCustomizationRequest.type, fetchCustomizationSaga);
    yield takeLatest(postCustomizationRequest.type, postCustomizationSaga);
}