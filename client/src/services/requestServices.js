import Api from '@/services/api'

let fetchStoreData = key => {
  if (window.localStorage.getItem('mDr-default') && window.localStorage.getItem('mDr-default') !== null) {
    return JSON.parse(JSON.parse(window.localStorage.getItem('mDr-default')).value)[key]
  } else {
    return null
  }
}

let header = {
  headers: {
    'x-access-token': fetchStoreData('authToken')
  }
}

export default {
  seekAppointment (data) {
    // data.token = fetchStoreData('authToken')
    return Api().post('/appointment/seekAppointment', data, header)
  },
  fetchAppointments (data) {
    return Api().get('/appointment/fetchAppointments', data, header)
  },
  cancelAppointment (userId) {
    return Api().post('/cancelAppointment', userId)
  }
}
