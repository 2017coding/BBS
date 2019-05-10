import request from '@/common/js/request'

// 获取标签类型
export function getTagTypeApi (params) {
  return request({
    url: '/api/TagType/getAll',
    method: 'get',
    params
  })
}

// 获取所有标签
export function getTagApi (params) {
  return request({
    url: '/api/Tag/getAll',
    method: 'get',
    params
  })
}
