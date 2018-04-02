//引入actiontype，创建action
import * as clicknumTypes from '../actionTypes/clicknum.js'

export function changeClickNumberAsync(data) {
    return {
        type: clicknumTypes.INCREMENT_ASYNC,
        payload: data
    };
}

export function showLoadingAsync(data) {
    return {
        type: 'LOADING_ASYNC',
        payload: data
    };
}
