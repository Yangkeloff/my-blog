import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  adminInfo:{
    // token: window.sessionStorage.getItem('token') || '',
    token: true,
    admin_name: window.sessionStorage.getItem('admin_name') || '',
    admin_id: window.sessionStorage.getItem('admin_id') || ''
  }
}

const mutations = {
  saveAdminInfo: (state,data) => {
    state.adminInfo.token = data.token
    state.adminInfo.admin_name = data.admin_name
    state.adminInfo.admin_id = data.admin_id

    window.sessionStorage.setItem('token', data.token)
    window.sessionStorage.setItem('admin_name', data.admin_name)
    window.sessionStorage.setItem('admin_id', data.admin_id)
  },
  adminLogout: (state) => {
    state.adminInfo.token = ''
    state.adminInfo.admin_name = ''
    state.adminInfo.admin_id = ''

    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('admin_name')
    window.sessionStorage.removeItem('admin_id')
  }
}

export default new Vuex.Store({
  modules: {

  },
  state,
  mutations
})