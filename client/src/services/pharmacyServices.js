import Api from '@/services/api'

export default {
  addToPharmacy (drugDetails) {
    return Api().post('/pharmacy/addDrug', drugDetails)
  }
}
