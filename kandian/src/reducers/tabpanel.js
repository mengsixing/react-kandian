/**
 * Created by admin on 2017/7/3.
 */
import * as tabpanelTypes from '../actionTypes/tabpanel'
var initialState={
    panel:'home'
};
export default function tabpanel(state = initialState, action){
    switch (action.type) {
        case tabpanelTypes.CHANGE_PANEL:
            return action.data
        default:
            return state
    }
}