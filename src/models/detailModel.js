import * as appService from '../services/detailService.js'
var Base64 = require('js-base64').Base64

export default {

  namespace: 'detailState',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    //获取新闻详情
    *getNewsDetail(action, { call, put }) {
      const newsDetail = yield call(appService.getNewsDetail, action.payload.id)
      newsDetail.data.content = Base64.decode(newsDetail.data.content)
      console.log('newsDetail.data', newsDetail.data)
      yield put({ type: 'save', payload: { newsDetail: newsDetail.data } })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    }
  }

}
