import request from '@/common/js/request'

// 得到博客列表
export function getListApi (data) {
  return request({
    url: 'static/json/home/datalist.json',
    method: 'get',
    data
  })
}
