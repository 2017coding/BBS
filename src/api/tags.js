import request from '@/common/js/request'

// 获取标签类型
export function getTagTypeApi (params) {
  return request({
    url: '/api/TagType/getAll',
    method: 'get',
    params
  })
}
