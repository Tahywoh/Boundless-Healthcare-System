import axios from 'axios'

export default() => {
  return axios.create({
    // baseURL: `https://server-xvjuwdaxhc.now.sh`
    baseURL: `http://localhost:7070`
    // headers: {'access-token': `${this.$store.state.token}`}
  })
}
