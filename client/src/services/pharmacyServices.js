import Api from '@/services/api'

export default {
  addToPharmacy (drugDetails) {
    return Api().post('/pharmacy/addDrug', drugDetails)
  },
  removeFromPharmacy (data) {
    return Api().post('/pharmacy/removeDrug', data)
  },
  addToCart (data) {
    return Api().post('/pharmacy/placeOrder', data)
  }
}
