import api from '@/axios'

const state = {
  data: [],
  mark: false
}

const actions = {
  async get_work_api({state,commit}){
    if(state.mark) return state.data
    let res = await api.api_get_work()
    commit('save_work_data', res.data)
    return res.data.data
  }
}

const mutations = {
  save_work_data(state, {data=[]}){
    state.data = data
    state.mark = true
  }
}

export default {
  state,
  actions,
  mutations
}