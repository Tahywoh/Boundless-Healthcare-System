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
    },
    userData: {
      docPatients: '',
      patientDocs: '',
      pharmacistOrders: '',
      patientCarts: '',
      appointment: {
        reason: '',
        start: '',
        end: '',
        note: '',
        status: 'pending'
      }
    },
    consult: {
      doctorName: '',
      doctorEmail: '',
      patientName: '',
      newRoom: '',
      isConnectedToSocket: false,
      socketMessage: ''
    }
  },
  mutations: {
    SET_USER (state, user) {
      state.token = user.token
      if (user.token) {
        state.isUserLoggedIn = true
         // user profile
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

        // setting user meta data
        state.userData.docPatients = user.docPatients
        state.userData.patientDocs = user.patientDocs
        state.userData.pharmacistOrders = user.pharmacistOrders
        state.userData.patientCarts = user.patientCarts
        // setting user appointments
        state.userData.appointment.reason = user.reason
        state.userData.appointment.date = user.date
        state.userData.appointment.start = user.start
        state.userData.appointment.end = user.end
        state.userData.appointment.status = user.status
      } else {
        state.isUserLoggedIn = false
        // this.$router.push('/login')
      }
    },
    SOCKET_CONNECT (state) {
      if (state.token) {
        state.consult.isConnectedToSocket = true
      }
    },
    SOCKET_CREATECHANNEL (state, newRoom) {
      // if (state.token !== '') {
      //   state.consult.roomNames.push({'newRoom': newRoom.roomNames})
      // }
      if (state.token !== '') {
        state.consult.newRoom = newRoom.newRoom
        // state.consult.roomNames.push({'channel': newRoom.roomName})
      } else {
        state.consult.newRoom = ''
        // state.consult.roomNames = []
      }
    },
    SOCKET_DELETCHANNEL (state) {
      // state.consult.roomNames = null
      // state.consult.roomName = null
    },
    SOCKET_DISCONNECT (state) {
      state.consult.isConnectedToSocket = false
    },
    CLEAR_USER (state) {
      state.token = ''
      state.userType = ''
      state.profile = {}
      state.consult = {}
      state.userData = {}
      state.isUserLoggedIn = false
      state.consult.roomNames = []
      state.consult.roomName = ''
      // state.consult = null
    }
  },
  plugins: [createPersist({
    namespace: 'BHS',
    expires: 4 * 60 * 60 * 1e3
  })]

})
