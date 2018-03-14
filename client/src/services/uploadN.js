import Api from '@/services/api'

let fetchStoreData = key => {
  if (window.localStorage.getItem('mDr-default') && window.localStorage.getItem('mDr-default') !== null) {
    return JSON.parse(JSON.parse(window.localStorage.getItem('mDr-default')).value)[key]
  } else {
    return null
  }
}

let headers = {
  headers: {
    'x-access-token': fetchStoreData('authToken')
  }
}

export default {
  uploadPhoto ()
}