import Api from '@/services/api'

export default {
  getDoctor () {
    return Api().get('doctors')
  }
}
