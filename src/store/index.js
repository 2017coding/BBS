import Vue from 'vue'
import Vuex from 'vuex'
import bbs from './modules/bbs'
import errorLog from './modules/errorLog'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    bbs,
    user,
    errorLog
  },
  getters
})

export default store
