//引入actiontype，创建action
import * as tabpanelTypes from '../actionTypes/tabpanel'

export function changeTabPanel(data) {
    return {
        type: tabpanelTypes.CHANGE_PANEL,
        data
    }
}


export function changeTabPanelAsync(data) {
    return function(dispatch, getState) {
        dispatch({
            type: tabpanelTypes.CHANGE_PANEL,
            data: {panel:'home'}
        });
        //setTimeout模拟异步请求
        setTimeout(function() {
            dispatch({
                type: tabpanelTypes.CHANGE_PANEL,
                data
            });
        }, 1000);
    }

}