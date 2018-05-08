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
    currentDrug: null,
    currentLab: null,
    currentUserDrug: null,
    viewDoc: null,
    allDocs: null,
    userData: {
      docPatients: 0,
      patientDocs: 0,
      pharmacistOrders: {
        // aggregateOrders: 0,
        // data: null
      },
      patientCarts: {}
    },
    profile: {},
    // profile: {
    //   email: null,
    //   fullName: '',
    //   telephone: '',
    //   city: '',
    //   state: '',
    //   address: '',
    //   specialty: '',
    //   profilePhoto: '',
    //   hospitalName: '',
    //   hospitalAddress: '',
    //   pharmacyName: '',
    //   pharmacyAddress: '',
    //   laboratoryName: '',
    //   laboratoryAddress: '',
    //   eduRequirement: '',
    //   licenseRequirement: ''
    // },
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
      if (state.token) {
        state.isUserLoggedIn = true
         // user profile
        state.userType = user.userType
        state.profile.email = user.email
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
        state.profile.profilePhoto = user.profilePhoto
      } else {
        state.isUserLoggedIn = false
        // this.$router.push('/login')
      }
    },
    SET_PATIENTCARTS (state, user) {
      if (state.token) {
        state.userData.patientCarts = user.patientCarts
      }
    },
    SET_PHARMACISTORDERS (state, user) {
      if (state.token) {
        // state.userData.pharmacistOrders.aggregateOrders = user.aggregateOrders
        state.userData.pharmacistOrders.data = user.data
      }
    },
    CLEAR_CARTS (state) {
      state.userData.patientCarts = null
    },
    CLEAR_CURRENTUSERDRUGS (state) {
      state.currentUserDrug = null
    },
    SET_USERDATA (state, user) {
      if (state.token) {
        state.userData.docPatients = user.docPatients
        state.userData.patientDocs = user.patientDocs
        // state.userData.pharmacistOrders = user.pharmacistOrders
        state.userData.patientCarts = user.patientCarts
      }
    },
    SOCKET_CONNECT (state) {
      if (state.token) {
        state.consult.isConnectedToSocket = true
      }
    },
    SOCKET_CREATECHANNEL (state, newRoom) {
      // state.consult.doctorName = newRoom.doctorName
      // state.consult.doctorEmail = newRoom.doctorEmail
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
    SET_CURRENTDRUG (state, user) {
      state.currentDrug = user.currentDrug
    },
    SET_CURRENTLAB (state, user) {
      state.currentLab = user.currentLab
    },
    SET_CURRENTUSERDRUG (state, user) {
      state.currentUserDrug = user.currentUserDrug
    },
    SET_VIEWDOC (state, user) {
      state.viewDoc = user.viewDoc
    },
    SET_ALLDOCS (state, data) {
      state.allDocs = data.allDocs
    },
    SET_DOCPATIENT (state, data) {
      state.consult.doctorName = data.doctorName
      state.consult.doctorEmail = data.doctorEmail
    },
    CLEAR_USER (state) {
      state.token = ''
      state.userType = ''
      state.profile = {}
      state.consult = {}
      state.userData = {}
      state.isUserLoggedIn = false
      state.consult = {}
      if ((state.userType === 'Patient')) {
        state.consult.roomName = ''
        state.userData.patientCarts = null
      }
      // state.consult = null
      state.currentDrug = null
    }
  },
  plugins: [createPersist({
    namespace: 'BHS',
    expires: 4 * 60 * 60 * 1e3
  })]

})
