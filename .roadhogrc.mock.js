import newsTagList from './mock/newsTagList.js'
import bannerList from './mock/bannerList.js'
import newsList from './mock/newsList.js'
import newsDetail from './mock/newsDetail.js'

export default {
  // Support type as Object and Array
  'GET /api/cate/cate_list': newsTagList,
  'GET /api/face/face_list': bannerList,
  'GET /api/news/news_list': newsList,
  'GET /api/news/news_detail': newsDetail,

  // Method like GET or POST can be omitted
  '/api/users/1': { id: 1 },

  // Support for custom functions, the API is the same as express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
