import request from '../utils/request';

export function getNewsDetail(id) {
  return request('/api/news/news_detail?id='+id);
}

