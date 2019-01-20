export default {
  // 系统名称
  SYSTEMNAME: '华力特能源管理云平台',
  // admin角色类型
  AROLE: 1,
  // 平台管理员角色类型
  PROLE: 2,
  // 服务商角色类型
  EROLE: 3,
  // 企业用户角色类型
  UROLE: 4,
  // 表格分页数
  PAGESIZE: 10,
  // 表格页数类型
  PAGESIZES: [10, 20, 50, 100],
  // map地图中心
  MapCenter: [113.911767, 22.72883],
  // 上传路径(是一个地址代理)
  uPurlHost: '',
  // HT消息服务层
  HtURl: process.env.HtURl,
  // excel导出路径
  excelURL: process.env.excelURL,
  // socket地址
  socketURL: process.env.socketURL,
  // 能耗类型编码
  elecCode: '01000',
  waterCode: '02000',
  gasCode: '03000',
  hotCode: '04000',
  coldCode: '05000'
}
