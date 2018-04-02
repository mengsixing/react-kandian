import { delay } from 'redux-saga'
import { put, takeEvery,all } from 'redux-saga/effects'
import * as clicknumTypes from '../actionTypes/clicknum.js'

export function* helloSaga() {
    console.log('Hello Sagas!')
    yield null
}

export function* incrementAsync() {
    yield put({ type: clicknumTypes.LOADING })
    yield delay(1000)
    yield put({ type: clicknumTypes.CHANGE_NUMBER })
}

export function* showLoadingAsync() {
    yield put({ type: clicknumTypes.LOADING })
}


export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
export function* watchLoading() {
    yield takeEvery('LOADING_ASYNC', showLoadingAsync)
}


export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchLoading()
    ])
}
