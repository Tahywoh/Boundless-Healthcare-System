import Api from '@/services/api'
// import Store from '@/store/store'
export default {
  getDoctor () {
    return Api().get('doctors/:id')
  },
  findDoctors (query) {
    return Api().post('/search/doctors', query)
  },
  findDrugs (query) {
    return Api().post('/search/pharmacy', query)
  },
  findLabs (query) {
    return Api().post('/search/medicalLabs', query)
  }
}
