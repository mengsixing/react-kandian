import * as appService from '../services/appService.js'

//全局计数器
export default {

  namespace: 'appState',

  state: {
    number: 0,
    loading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *add(action, { call, put }) {
      yield put({ type: 'addLoading' })
      yield call(appService.delay, 1000)
      yield put({ type: 'addSave' })
    }
  },

  reducers: {
    //手动加1时显示loading
    addLoading(state) {
      return {
        ...state, loading: true
      }
    },
    //保存最新状态到appState
    addSave(state) {
      const newCurrent = state.number + 1
      return {
        ...state,
        number: newCurrent,
        loading: false
      }
    }

  }

}
