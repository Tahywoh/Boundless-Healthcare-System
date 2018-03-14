import Api from '@/services/api'

export default {
  imageUpload (formdata) {
    return Api().post('/handlephoto/imgUpload', formdata)
    // return axios.post('/multiple_uploads', formdata)
  }
}
