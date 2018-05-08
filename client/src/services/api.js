import axios from 'axios'

export default() => {
  return axios.create({
    // baseURL: `https://server-dvvtkzhghy.now.sh`
    baseURL: `http://localhost:3050`
    // headers: {'access-token': `${this.$store.state.token}`}
  })
}
