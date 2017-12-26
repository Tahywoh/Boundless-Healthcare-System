import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    userType: null,
    token: null,
    isUserLoggedIn: false,
    lastPageVisited: '',
    lastPage: '',
    profile: {
      user: null,
      fullName: '',
      telephone: '',
      city: ''
    }
  },
  mutations: {
    SET_USER (state, user) {
      state.token = user.token
      if (user.token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
        // this.$router.push('/login')
      }
      state.userType = user.userType
      state.profile.user = user.user
      state.profile.fullName = user.fullName
      state.profile.telephone = user.telephone
      state.profile.city = user.city
    },
    CLEAR_USER (state) {
      state.token = ''
      state.userType = ''
      state.profile = {}
      state.isUserLoggedIn = false
    }
  },
  plugins: [createPersist({
    namespace: 'BHS',
    expires: 4 * 60 * 60 * 1e3
  })]

})
