// import Api from '@/services/api'
// export default{
//   upload (formData) {
//     return Api.post('/uploads', formData)
//     .then(x => x.data)
//       .then(x => x.map(img => Object.assign({}, img, { url: `http://localhost:7000/handlePhoto/uploads/${img.id}` })))
//   }
// }

import * as axios from 'axios'
const BASE_URL = 'http:localhost:7070'

let upload = (formData) => {
  const url = `${BASE_URL}/handlePhoto/uploads`
  return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/uploads/${img.id}` })))
}

export {upload}
