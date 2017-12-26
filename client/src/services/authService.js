import Api from '@/services/api'

export default {
  registerPatient (credentials) {
    return Api().post('/signup/patient', credentials)
  },
  registerDoctor (credentials) {
    return Api().post('/signup/doctor', credentials)
  },
  registerPharmacist (credentials) {
    return Api().post('/signup/pharmacist', credentials)
  },
  signInUsers (credentials) {
    return Api().post('/signin', credentials)
  }
}
