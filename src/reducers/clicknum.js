//引入action，创建reducer
import * as clicknumTypes from '../actionTypes/clicknum'

var initialState = {
	number:0,
	loading:false
};

export default function clicknum(state = initialState, action) {
    switch (action.type) {
        case clicknumTypes.CHANGE_NUMBER:
            return  {...state,number:state.number+1,loading:false};
        case clicknumTypes.LOADING:
            return {...state,loading:true};
        default:
            return state
    }
}
