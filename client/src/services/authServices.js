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
  registerMedlabScientist (credentials) {
    return Api().post('/signup/medlabscientist', credentials)
  },
  signInUsers (credentials) {
    return Api().post('/signin', credentials)
  },
  updatePatientProfile (credentials) {
    return Api().post(`/profile/${encodeURI('update patient profile')}`, credentials)
  },
  updatePharmacistProfile (credentials) {
    return Api().post(`/profile/${encodeURI('update pharmacist profile')}`, credentials)
  },
  updateDoctorProfile (credentials) {
    return Api().post(`/profile/${encodeURI('update doctor profile')}`, credentials)
  },
  updateMedlabscientistProfile (credentials) {
    return Api().post(`/profile/${encodeURI('update medlabscientist profile')}`, credentials)
  }
}
