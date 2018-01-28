import Api from '@/services/api'
// import Store from '@/store/store'
export default {
  getAllDrugs () {
    return Api().get('/getAllDrugs')
  },
  getCurrentUserDrugs (user) {
    return Api().post('/search/userDrugs', user)
  }
}
