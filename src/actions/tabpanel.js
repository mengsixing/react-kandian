//引入actiontype，创建action
import * as tabpanelTypes from '../actionTypes/tabpanel'

export function changeTabPanel(data) {
    return {
        type: tabpanelTypes.CHANGE_PANEL,
        data
    }
}
