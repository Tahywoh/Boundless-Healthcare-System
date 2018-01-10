export default {
  data () {
    return {
      onLoggedOut: '/',
      userType: this.$store.state.userType
    }
  },
  mounted () {
    this.$eventBus.$on('go-to-profile', () => {
      this.$router.replace(`/${this.$store.state.userType.replace(/\\s/g, '')}-interface/profile`)
    })
    this.$eventBus.$on('do-nothing', () => {})
    this.$eventBus.$on('do-logout', () => this.logOut())
    this.$eventBus.$on('go-to-dashboard', () => this.goToDashboard())
    this.$eventBus.$on('go-to-profile', () => this.goToProfile())
    this.$eventBus.$on('go-to-appointment', () => this.goToAppointment())
    this.$eventBus.$on('send-location', () => this.locateMe())
  },
  methods: {
    toCapitalize (capitalizeMe) {
      let obtained = []
      let capitalizeVal = capitalizeMe.toLowerCase().split(' ')
      capitalizeVal.forEach(word => {
        let newWord = word.split('')
        newWord[0] = newWord[0].toUpperCase()
        newWord = newWord.join('')
        obtained.push(newWord)
      })
      capitalizeMe = obtained.join(' ')
      return capitalizeMe
    },
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
      // window.navigator.geolocation.getCurrentPosition((loc) => {
      //   console.log(loc.coords, loc.timestamp)
      // })
      if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
      }
      navigator.geolocation.getCurrentPosition(Position => {
        console.log(Position.coords.latitude, Position.coords.longitude, Position.timestamp)
      }, () => {
        alert('Unable to fetch location')
      })
    },
    doNothing () {
      console.log('as you can see I am doing nothing...')
    },
    stringify (data) {
      return JSON.stringify(data, null, 2)
    },
    logOut () {
      this.$store.commit('CLEAR_USER')
      // this.$router.push(this.onLoggedOut)
      location.href = this.onLoggedOut
    },
    goToDashboard () {
      location.href = `/${this.$store.state.userType.replace(/\s/g, '')}-interface`
    },
    goToProfile () {
      location.href = `/${this.$store.state.userType.replace(/\\s/g, '')}-interface/profile`
    },
    goToAppointment () {
      location.href = `/${this.$store.state.userType.replace(/\\s/g, '')}-interface/appointment`
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('go-to-profile')
    this.$eventBus.$off('do-nothing')
    this.$eventBus.$off('do-logout')
    this.$eventBus.$off('go-to-dashboard')
    this.$eventBus.$off('go-to-appointment')
  }
}
