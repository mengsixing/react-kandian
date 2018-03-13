//引入action，创建reducer
import * as clicknumTypes from '../actionTypes/clicknum'

var initialState = {
	number:1,
	loading:false
};

export default function clicknum(state = initialState, action) {
    switch (action.type) {
        case clicknumTypes.CHANGE_NUMBER:
        		var obj= Object.create(state);
        		obj.number++;
        		obj.loading=false
            return  obj;
        case clicknumTypes.LOADING:
            return {...state,loading:true};
        case clicknumTypes.INCREMENT_ASYNC:
            return {...state,loading:true};
        default:
            return state
    }
}
