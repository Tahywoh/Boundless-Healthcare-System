import Api from '@/services/api'

export default {
  registerPatient (credentials) {
    return Api().post('/register/patient', credentials)
  }
}
