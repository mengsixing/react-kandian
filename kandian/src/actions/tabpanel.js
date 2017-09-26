import * as tabpanelTypes from '../actionTypes/tabpanel'
 export function changeTabPanel(data) {
    return {
        type: tabpanelTypes.CHANGE_PANEL,
        data
    }
}

