import request from '../utils/request';

export function getTags() {
  return request('/api/cate/cate_list');
}

export function getNews(cid,offset) {
  var params={
    cid,offset
  }
  return request('/api/news/news_list',params);
}
export function getBanner() {
  return request('/api/face/face_list');
}

