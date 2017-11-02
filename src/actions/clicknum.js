//引入actiontype，创建action
import * as clicknumTypes from '../actionTypes/clicknum.js'



export function changeClickNumberAsync(data) {
    return function(dispatch, getState) {
    	dispatch({
    		type: clicknumTypes.LOADING,
            payload:data
    	})
        //setTimeout模拟异步请求
        setTimeout(function() {
            dispatch({
                type: clicknumTypes.CHANGE_NUMBER,
                payload:data
            });
        }, 1000);
    }

}