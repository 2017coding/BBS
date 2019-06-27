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

// 舍弃草稿
export function giveUpDraftApi (data) {
  return request({
    url: `api/draft/giveUp`,
    method: 'delete',
    data
  })
}

// 舍弃全部草稿
export function giveUpAllDraftApi () {
  return request({
    url: `api/draft/giveUpAll`,
    method: 'delete'
  })
}
