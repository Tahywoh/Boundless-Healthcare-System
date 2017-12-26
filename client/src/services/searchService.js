import Api from '@/services/api'
import Store from '@/store/store'
export default {
  getDoctors () {
    return Api().get('/doctors')
  },
  getDoctor () {
    return Api().get('doctors/:id')
  },
  findDoctors (query) {
    return Api().post('/doctors', query)
  },
  findDrugs (query) {
    return Api().post('/search/pharmacy', {token: Store.state.token, query})
  }
}
