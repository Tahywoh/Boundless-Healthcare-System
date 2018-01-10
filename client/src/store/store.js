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
      city: '',
      state: '',
      address: '',
      specialty: '',
      hospitalName: '',
      hospitalAddress: '',
      pharmacyName: '',
      pharmacyAddress: '',
      laboratoryName: '',
      laboratoryAddress: '',
      eduRequirement: '',
      licenseRequirement: ''
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
      state.profile.state = user.state
      state.profile.address = user.address
      state.profile.specialty = user.specialty
      state.profile.hospitalName = user.hospitalName
      state.profile.hospitalAddress = user.hospitalAddress
      state.profile.pharmacyName = user.pharmacyName
      state.profile.pharmacyAddress = user.pharmacyAddress
      state.profile.laboratoryName = user.laboratoryName
      state.profile.laboratoryAddress = user.laboratoryAddress
      state.profile.eduRequirement = user.eduRequirement
      state.profile.licenseRequirement = user.licenseRequirement
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
