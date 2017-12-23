export default {
  data () {
    return {
      onLoggedOut: '/',
      userType: this.$store.state.userType
    }
  },
  mounted () {
    this.$eventBus.$on('go-to-profile', () => {
      this.$router.replace(`/${this.$store.state.userType}-interface/profile`)
    })
    this.$eventBus.$on('do-nothing', () => {})
    this.$eventBus.$on('do-logout', () => this.logout())
  },
  methods: {
    back () {
      // history.back()
      window.history.length > 2
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    updateStore (key, value) {
      let storeData = {}
      if (window.localStorage.getItem('BHS-default')) {
        storeData = JSON.parse(JSON.parse(window.localStorage.getItem('BHS-default')).value)
      }
      storeData[key] = value
      localStorage.setItem('BHS-default', JSON.stringify({value: JSON.stringify(storeData)}))
    },
    truncate (word, max) {
      if (word.length > max) word = word.substring(0, (max - 2)) + '..'
      return word
    },
    locateMe () {
      console.log('fetching location')
      window.navigator.geolocation.getCurrentPosition((loc) => {
        console.log(loc.coords, loc.timestamp)
      })
    },
    doNothing () {
      console.log('as yuo can see I am doing nothing...')
    },
    stringify (data) {
      return JSON.stringify(data, null, 2)
    },
    logout () {
      this.$store.commit('CLEAR_USER')
      this.$router.push(this.onLoggedOut)
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('go-to-profile')
    this.$eventBus.$off('do-nothing')
    this.$eventBus.$off('do-logout')
  }
}
