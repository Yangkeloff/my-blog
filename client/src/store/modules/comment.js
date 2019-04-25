import api from '@/axios'

const state = {
  data: [],
  current_display: {}
}

const actions = {
  async get_comment_api({state,commit}, id){
    id = id || ''
    let data = state.data.find( item => {
      return item.id == id
    })
    if(data == null || data.length == 0){
      let res = await api.api_get_comment_by_article(id)
      res.data.id = id
      commit('save_comment_data', res.data)
    }else {
      state.current_display = data.list
    }
  }
}

const mutations = {
  save_comment_data(state, {data =[],id=''}){
    state.data.push({
      id,
      list:data
    })
    state.current_display = data
  }
}

export default {
  state,
  actions,
  mutations
}