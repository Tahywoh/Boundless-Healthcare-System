import Api from '@/services/api'
export default{
  upload (formData) {
    return Api.post('/uploads', formData).then(x => x.data)
      .then(x => x.map(img => Object.assign({}, img, { url: `http://localhost:9000/images/${img.id}` })))
  }
}
