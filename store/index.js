const cookieparser = require('cookieparser')
import apiService from '@/services/apiService'
export const state = () => ({
  user:null,
  token:null,
})

export const getters = {

}

export const mutations = {
  user(state,ob){
    state.user = ob
  },
  token(state,ob){
    state.token = ob
  }
}

export const actions = {
  nuxtServerInit ({ commit , dispatch}, { req }) {

    //登录赋值
    let token = null
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        token = parsed.token
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
      commit('token', token)
      commit('user', user)
    }
  },
}
