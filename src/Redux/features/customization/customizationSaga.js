import { put, takeLatest, call } from 'redux-saga/effects';
import {
    updateCustomization,
    setLoading,
    setError
} from './customizationSlice';
import { getCustomization, postCustomization } from './customizationApi';

// Worker Saga for fetching customization
function* fetchCustomizationSaga(action) {
    try {
        yield put(setLoading(true));
        const customization = yield call(getCustomization, action.payload);
        yield put(updateCustomization(customization));
        yield put(setError(null));
    } catch (error) {
        console.error('Failed to fetch customization:', error);
        yield put(setError(error.message));
    } finally {
        yield put(setLoading(false));
    }
}

// Worker Saga for posting customization
function* postCustomizationSaga(action) {
    try {
        yield put(setLoading(true));
        const { token, data } = action.payload;
        yield call(postCustomization, token, data);
        yield put(updateCustomization(data));
        yield put(setError(null));
    } catch (error) {
        console.error('Failed to post customization:', error);
        yield put(setError(error.message));
    } finally {
        yield put(setLoading(false));
    }
}

// Watcher Saga
export function* watchCustomization() {
    yield takeLatest('customization/fetchCustomization', fetchCustomizationSaga);
    yield takeLatest('customization/postCustomization', postCustomizationSaga);
}