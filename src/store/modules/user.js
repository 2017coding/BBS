const user = {
  namespaced: true,
  state: {
    token: '',
    userInfo: ''
  },
  mutations: {
    // 设置token
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // 设置用户信息
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 存储用户数据
    setUserInfo ({commit}, data) {
      return new Promise((resolve, reject) => {
        // commit('SET_TOKEN', 'token')
        commit('SET_USERINFO', data)
        // 将数据存到缓存
        // _setToken('token')
        // _setUserInfo(data)
        resolve()
      })
    }
  }
}

export default user
