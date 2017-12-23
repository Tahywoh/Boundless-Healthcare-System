import Api from '@/services/api'

export default {
  getDoctors () {
    return Api().get('doctors')
  }
  // show ()
  // /getDoctors/doctors/:id
}
