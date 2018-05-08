<template>
  <div class="basic-details">
    <div class="divider"></div>
    <a href="#" class="w3-bar-item w3-button"><h6>Full Name:</h6>  <br/><h6 class="userFullName" >{{userFullName}}</h6></a>
    <a href="#" class="w3-bar-item w3-button"><h6>Email Address:</h6> <br>
    <h6 class="userEmail">{{userEmailAddress}}</h6> </a>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'basicDetails',
  mounted () {
    this.userFullName = this.toCapitalize(this.userFullName)
  },
  data () {
    return {
      userFullName: this.$store.state.profile.fullName,
      userEmailAddress: this.$store.state.profile.email
    }
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
    }
  }
}
</script>
