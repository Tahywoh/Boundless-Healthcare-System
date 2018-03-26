import Api from '@/services/api'
// import Store from '@/store/store'
export default {
  getAllDrugs () {
    return Api().get('/search/getAllDrugs')
  },
  getCurrentUserDrugs (user) {
    return Api().post('/search/userDrugs', user)
  },
  getAllDocs () {
    return Api().get('/search/getAllDocs')
  }
}
