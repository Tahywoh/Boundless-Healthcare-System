import Api from '@/services/api'

let fetchStoreData = key => {
  if (window.localStorage.getItem('BHS-default') && window.localStorage.getItem('BHS-default') !== null) {
    return JSON.parse(JSON.parse(window.localStorage.getItem('BHS-default')).value)[key]
  } else {
    return null
  }
}

let header = {
  headers: {
    'x-access-token': fetchStoreData('token')
  }
}

export default {
  seekAppointment (data) {
    // data.token = fetchStoreData('authToken')
    return Api().post('/appointment/seekAppointment', data, header)
  },
  appointmentWithLabScientist (data) {
    return Api().post('/appointment/labAppointment', data)
  },
  fetchAppointments (data) {
    return Api().post('/appointment/fetchAppointments', data, header)
  },
  updateAppointment (data) {
    return Api().post('/appointment/updateAppointment', data, header)
  },
  cancelAppointment (userId) {
    return Api().post('/cancelAppointment', userId, header)
  },
  setAppointmentDate (data) {
    return Api().post('/appointment/setAppointmentDate', data)
  }
}
