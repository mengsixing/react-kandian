import * as appService from '../services/appService.js'
var Base64 = require('js-base64').Base64

//延迟1s执行函数
function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  });
}

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
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
    *add(action, { call, put }) {
      yield put({ type: 'addLoading' })
      yield call(delay, 1000);
      yield put({ type: 'addSave' })
    },
    //获取头部tags和第一条tag对应的新闻列表
    *getDefaultInfo(action, { call, put }) {
      var tags = yield call(appService.getTags)
      var news = yield call(appService.getNews, tags.data[0].id, 0)
      yield put({ type: 'save', payload: { tagList: tags.data, newsList: news.data.dataList, cid: tags.data[0].id, pageIndex: 1 } })
    },
    //获取banner广告信息
    *getBanner(action, { call, put }) {
      var banners = yield call(appService.getBanner)
      var filterBanners = banners.data.filter(p => p.is_show === '1')
      yield put({ type: 'save', payload: { bannerList: filterBanners } })
    },
    //获取对应tag下的新闻列表
    *getNewsList(action, { call, put }) {
      var newsList = yield call(appService.getNews, action.payload.cid, action.payload.offset)
      if (newsList.data.dataList.length > 0) {
        yield put({ type: 'updateNews', payload: { newsList: newsList.data.dataList } })
      }
    },
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
    },
    updateNews(state, action) {
      return { ...state, ...{ pageIndex: state.pageIndex + 1, newsList: state.newsList.concat(action.payload.newsList) } }
    },
    addLoading(state) {
      return {
        ...state, loading: true
      }
    },
    addSave(state) {
      const newCurrent = state.number + 1
      return {
        ...state,
        number: newCurrent,
        loading: false
      }
    },
  },

};
