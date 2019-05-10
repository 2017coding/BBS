import request from '@/common/js/request'

// 创建问题
export function createQuestionApi (data) {
  return request({
    url: '/api/question/create',
    method: 'post',
    data
  })
}

// 编辑问题
export function updateQuestionApi (data) {
  return request({
    url: '/api/question/update',
    method: 'put',
    data
  })
}

// 创建文章
export function createArticleApi (data) {
  return request({
    url: '/api/article/create',
    method: 'post',
    data
  })
}

// 编辑文章
export function updateArticleApi (data) {
  return request({
    url: '/api/article/update',
    method: 'put',
    data
  })
}
