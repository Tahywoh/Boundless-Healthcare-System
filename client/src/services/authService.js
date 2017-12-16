import Api from '@/services/api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  }
}

// authService.register({
//   // email: 'testing@taiwo.com'
//   // password: '1234'
// })
