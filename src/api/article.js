import request from '@/common/js/request'

// 添加评论
export function createArticleCommentsApi (data) {
  return request({
    url: '/api/articleComments/create',
    method: 'post',
    data
  })
}

// 删除评论
export function deleteArticleCommentsApi (id) {
  return request({
    url: `/api/articleComments/delete/${id}`,
    method: 'delete'
  })
}

// 获取评论列表
export function getArticleCommentsApi (params) {
  return request({
    url: '/api/articleComments/getAll',
    method: 'get',
    params
  })
}
