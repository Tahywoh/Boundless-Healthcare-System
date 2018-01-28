import Api from '@/services/api'

export default {
  addToPharmacy (drugDetails) {
    return Api().post('/pharmacy/addDrug', drugDetails)
  },
  drugDetails (details) {
    return Api().get('/pharmacy/drug/:id', details)
  }
}
