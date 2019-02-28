import {
  _removeCookie,
  _setSessionStore,
  _getSessionStore,
  _removeSessionStore
} from '@/common/js/storage'

const user = {
  namespaced: true,
  state: {
    userInfo: _getSessionStore('userInfo', 'JSONStr')
  },
  mutations: {
    // 设置用户信息
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 存储用户数据
    setUserInfo ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_USERINFO', data)
        // 将数据存到缓存
        _setSessionStore('userInfo', data, 'JSONStr')
        resolve()
      })
    },
    // 退出登录,将用户数据清除
    loginOut ({commit, dispatch}) {
      return new Promise(resolve => {
        _removeCookie('token')
        _removeSessionStore('userInfo')
        resolve()
      })
    }
  }
}

export default user
