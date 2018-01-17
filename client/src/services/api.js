import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://server-owvqnfrqly.now.sh`
    // baseURL: `http://localhost:9000`
  })
}
