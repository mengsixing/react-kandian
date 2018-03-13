//引入actiontype，创建action
import * as clicknumTypes from '../actionTypes/clicknum.js'

export function changeClickNumberAsync(data) {
    return {
        type: clicknumTypes.INCREMENT_ASYNC,
        payload: data
    };
}


export function changeClickNumber(data) {
    return {
        type: clicknumTypes.CHANGE_NUMBER,
        payload: data
    };
}

export function showLoading(data) {
    return {
        type: clicknumTypes.LOADING,
        payload: data
    };
}
