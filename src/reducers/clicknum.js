//引入action，创建reducer
import * as clicknumTypes from '../actionTypes/clicknum'

var initialState = {
	number:0,
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
        		var obj2= Object.create(state);
        		obj2.loading=true;
            return obj2;
        default:
            return state
    }
}