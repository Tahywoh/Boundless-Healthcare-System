import Api from '@/services/api'
// import Store from '@/store/store'
export default {
  getUserDrugs () {
    return Api().get('/getUserDrugs')
  },
  getAllDrugs () {
    return Api().get('/getAllDrugs')
  },
  getCurrentUserDrugs (user) {
    return Api().post('/search/userDrugs', user)
  }
}
