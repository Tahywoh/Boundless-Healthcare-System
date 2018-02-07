import axios from 'axios'

export default() => {
  return axios.create({
    // baseURL: `https://server-xvjuwdaxhc.now.sh`
    baseURL: `http://localhost:7000`
  })
}
