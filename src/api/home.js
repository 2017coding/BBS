import request from '@/common/js/request'

// 得到轮播列表
export function getCarouselApi (params) {
  return request({
    url: '/api/carousel/getAll',
    method: 'get',
    params
  })
}

// 得到文章列表
export function getArticleListApi (params) {
  return request({
    url: 'api/Article/getList',
    method: 'get',
    params
  })
}

export function getArticleInfoApi (id) {
  return request({
    url: `api/Article/getRow/${id}`,
    method: 'get'
  })
}
