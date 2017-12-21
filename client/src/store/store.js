import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    userType: null,
    token: null,
    isUserLoggedIn: false,
    profile: {
      user: null,
      fullName: '',
      telephone: '',
      city: ''
    }
  },
  mutations: {
    setUser (state, user) {
      state.token = user.token
      if (user.token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
      state.userType = user.userType
      state.profile.user = user.user
      state.profile.fullName = user.fullName
      state.profile.telephone = user.telephone
      state.profile.city = user.city
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
