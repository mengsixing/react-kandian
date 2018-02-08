import * as appService from '../services/appService.js'
function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
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
    *getDefaultInfo(action, { call, put }) {
      //获取头部tags信息
      var tags =  yield call(appService.getTags)
      //获取新闻列表信息
      var news=  yield call(appService.getNews,tags.data[0].id,0)
      yield put({ type: 'save', payload: { tagList:tags.data,newsList:news.data.dataList,cid:tags.data[0].id,pageIndex:1 } })
    },
    *getBanner(action, { call, put }){
      //获取banner广告信息
      var banners=  yield call(appService.getBanner)
      var filterBanners=banners.data.filter(p=>p.is_show === '1')
      yield put({ type: 'save', payload: { bannerList:filterBanners } })
    },
    *getNewsList(action, { call, put }){
      //获取banner广告信息
      var newsList=  yield call(appService.getNews,action.payload.cid,action.payload.offset)
      if(newsList.data.length>0){
        yield put({ type: 'updateNews', payload: { newsList:newsList.data } })
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    updateNews(state, action){
      return { ...state, ...{pageIndex:state.pageIndex+1,newsList:state.newsList.concat(action.payload.newsList)} };
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
      };
    },
  },

};
