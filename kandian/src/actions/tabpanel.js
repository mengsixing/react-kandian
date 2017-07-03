/**
 * Created by admin on 2017/7/3.
 */
import * as tabpanelTypes from '../actionTypes/tabpanel'
 export function changeTabPanel(data) {
    return {
        type: tabpanelTypes.CHANGE_PANEL,
        data
    }
}

