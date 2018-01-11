import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://server-itzvxdegfo.now.sh`
  })
}
