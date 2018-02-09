import * as appService from '../services/homeService.js'

export default {

  namespace: 'homeState',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
      //初始加载数据
      //dispatch({ type: 'getDefaultInfo' })
      //dispatch({ type: 'getBanner' })
    },
  },

  effects: {
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
    //获取滑动到底部的新闻列表
    *getNewsList(action, { call, put }) {
      var newsList = yield call(appService.getNews, action.payload.cid, action.payload.offset)
      if (newsList.data.dataList.length > 0) {
        yield put({ type: 'updateNews', payload: { newsList: newsList.data.dataList } })
      }
    },
    //获取切换tag后的新闻列表
    *getTagNewsList(action, { call, put }) {
      var newsList = yield call(appService.getNews, action.payload.cid, action.payload.offset)
      if (newsList.data.dataList.length > 0) {
        yield put({ type: 'save', payload: { newsList: newsList.data.dataList,pageIndex:1,cid:action.payload.cid } })
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    },
    updateNews(state, action) {
      return { ...state, ...{ pageIndex: state.pageIndex + 1, newsList: state.newsList.concat(action.payload.newsList) } }
    }

  }

}
