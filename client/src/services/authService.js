import Api from '@/services/api'

export default {
  registerPatient (credentials) {
    return Api().post('/signup/patient', credentials)
  },
  signInUsers (credentials) {
    return Api().post('/login', credentials)
  }
}
