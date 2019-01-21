import utils from '@/common/js/utils' // 公共方法
import validate from '@/common/js/validate' // 公共验证
import config from '@/common/js/config'
import BUS from '@/common/js/BUS'

export default {
  install (Vue, options) {
    Vue.prototype.$fn = utils
    Vue.prototype.$validate = validate
    Vue.prototype.$config = config
    Vue.prototype.$BUS = BUS
  }
}
