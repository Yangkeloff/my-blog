import Vue from 'vue'
import Vuex from 'vuex'
import tag from './modules/tag'
Vue.use(Vuex)

const state = {
  adminInfo:{
    token: window.sessionStorage.getItem('token') || '',
    admin_name: window.sessionStorage.getItem('admin_name') || ''
  }
}

const actions = {
  async getAdminInfo() {
    
  }
}

const mutations = {
  saveAdminInfo(state,data) {
    state.adminInfo.token = data.token
    state.adminInfo.admin_name = data.admin_name

    window.sessionStorage.setItem('token', data.token)
    window.sessionStorage.setItem('admin_name', data.admin_name)
  },
  adminLogout(state) {
    state.adminInfo.token = ''
    state.adminInfo.admin_name = ''

    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('admin_name')
  }
}

export default new Vuex.Store({
  modules: {
    tag
  },
  state,
  actions,
  mutations
})