import Api from '@/services/api'

export default {
  addToPharmacy (drugDetails) {
    return Api().post('/pharmacy/addDrug', drugDetails)
  },
  updateDrug (data) {
    return Api().post('/pharmacy/updateDrug', data)
  },
  removeFromPharmacy (data) {
    return Api().post('/pharmacy/removeDrug', data)
  },
  addToCart (data) {
    return Api().post('/pharmacy/addToCart', data)
  },
  removeFromCart (data) {
    return Api().post('/pharmacy/removeFromCart', data)
  },
  placeOrder (data) {
    return Api().post('/pharmacy/placeOrder', data)
  }
}
