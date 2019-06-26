import request from '@/common/js/request'

// 获取草稿数量
export function getDraftTotalsApi () {
  return request({
    url: `api/draft/getTotals`,
    method: 'get'
  })
}

// 获取草稿
export function getDraftApi () {
  return request({
    url: `api/draft/getAll`,
    method: 'get'
  })
}
