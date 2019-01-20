import request from '@/common/js/request'

// 得到博客列表
export function getListApi (data) {
  return request({
    url: 'static/json/B01/datalist.json',
    method: 'get',
    data
  })
}
