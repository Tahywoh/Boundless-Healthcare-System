<template>
  <div class="login center-align">
    <index>
      <div slot="indexMainContent" class="mainContent center-align m6 s12">
        <h3 class="blue white-text">Login</h3>
        <form class="col l6 s12 center-align center" @input="errorMsg" @submit.prevent="validateForm">
          <div class="row">
             <div class="input-field col s12">
              <i class="icon ion-android-mail blue-text"></i>
                <input type="email" name="user" class="validate grey-text text-darken-3" v-model="loginData.user">
                <label for="email">Email</label>
              </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="icon ion-ios-locked blue-text"></i>
              <input  type="password" class="validate grey-text text-darken-3" name="password" v-model="loginData.password">
              <label >Password</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <label>User type: </label>
              <i class="icon ion-android-person blue-text"></i><br/>
              <span class="userPicked blue-text x1 left">{{loginData.userType}}</span>
              <br/>
              <div class="userTypes">
                 <p><label for="Patient">Patient</label>
                <input name="userType" type="radio" id="patient" value="Patient" v-model="loginData.userType"/>
                
                </p>
                <p><label for="doctor">Doctor</label>
                  <input name="userType" type="radio" id="doctor" value="Doctor" v-model="loginData.userType" />
                  
                </p>
                <p><label for="pharmacist">Pharmacist</label>
                <input  name="userType" type="radio" id="pharmacist" value="Pharmacist" v-model="loginData.userType" />
                <br/>
                </p>
                <p><label for="labscientist">MedicalLab Scientist</label>
                <input  name="userType" type="radio" id="labscientist" value="MedicalLab Scientist" v-model="loginData.userType" />
                
                </p>
              </div>
             
            </div>
          </div>
             <small class="red-text errorMsg center-align" v-html="errorMsg"></small><br/>
           <button class="btn text-center blue submit-btn waves-effect waves-grey" id="loginBtn" @click="signInUsers">Login</button><br/><br/>
           <button class="btn text-center blue fpwd-btn waves-effect waves-grey" id="forgetPassword">Forget Password</button>
          
      </form>
      </div>
    </index>
    <router-view></router-view>
  </div>
</template>

<script>
import Index from '@/platform/index'
import AuthServices from '@/services/authServices'
export default {
  name: 'signin',
  components: { Index },
  data () {
    return {
      errorMsg: '',
      authToken: '',
      loginData: {
        user: '',
        password: '',
        userType: ''
      }
    }
  },
  methods: {
    validateForm (e) {},
    isValidEmail (email) {
      if (!email || email === '') {
        return false
      }
      email = email.trim()
      if (email === '' || !email) {
        return false
      }
      let regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,36})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      return regex.test(email)
    },
    async signInUsers () {
      let validateLogin = {}
      if (this.loginData.user !== '' && this.isValidEmail(this.loginData.user)) {
        validateLogin.user = this.loginData.user.toLowerCase()
      } else if (this.loginData.user === '' || this.loginData.user === null) {
        this.errorMsg = 'You must provide your email address'
        return false
      } else {
        this.errorMsg = 'invalid email address'
        return false
      }
      if (this.loginData.password.length >= 5) {
        validateLogin.password = this.loginData.password
      } else {
        this.errorMsg = 'Please provide a valid password of your account!'
        return false
      }
      if (this.loginData.userType !== '') {
        validateLogin.userType = this.loginData.userType
      } else {
        this.errorMsg = 'Please choose a user type!'
        return false
      }
      // console.log(this.loginData)
      try {
        const response = await AuthServices.signInUsers(validateLogin)
        let responseData = response.data
        if (this.loginData.userType === 'Patient') {
          // console.log({responseData})
          // eslint-disable-next-line
          let {fullName, telephone, city, token, user, profilePhoto, userType, state, address, patientDocs, carts} = responseData

          this.authToken = token
          this.loginData.userType = userType
          // console.log({fullName, telephone, city, state, address, patientDocs, carts, profilePhoto, user})
          this.$store.commit('SET_USER', {token, email: user, profilePhoto, userType, fullName, telephone, city, state, address})
          // this.$store.commit('SET_USERDATA', {patientCarts: 0, patientDocs: 0})
          this.$store.commit('SET_PATIENTCARTS', {patientCarts: carts})
          this.$store.commit('SOCKET_CONNECT')
        } else if (this.loginData.userType === 'Doctor') {
          let {fullName, telephone, city, token, user, userType, state, specialty, hospitalName, hospitalAddress, profilePhoto, eduRequirement, licenseRequirement} = responseData

          this.authToken = token
          this.loginData.userType = userType
          // console.log({fullName, telephone, city, state, profilePhoto, specialty, hospitalName, hospitalAddress, eduRequirement, licenseRequirement, user})
          this.$store.commit('SET_USER', {token, email: user, userType, fullName, telephone, city, state, specialty, hospitalName, profilePhoto, hospitalAddress, eduRequirement, licenseRequirement})
          this.$store.commit('SOCKET_CONNECT')
          // this.$store.commit('SET_USERDATA', {docPatients: 0})
        } else if (this.loginData.userType === 'Pharmacist') {
          let {fullName, telephone, city, token, user, profilePhoto, userType, state, pharmacyName, pharmacyAddress, eduRequirement, licenseRequirement} = responseData

          this.authToken = token
          this.loginData.userType = userType
          // console.log({fullName, telephone, city, state, profilePhoto, pharmacyName, pharmacyAddress, eduRequirement, licenseRequirement, user})
          this.$store.commit('SET_USER', {token, email: user, profilePhoto, userType, fullName, telephone, city, state, pharmacyName, pharmacyAddress, eduRequirement, licenseRequirement})
          // this.$store.commit('SET_USERDATA', {pharmacistOrders: 0})
        } else {
          let {fullName, telephone, city, token, user, profilePhoto, userType, state, laboratoryName, laboratoryAddress, eduRequirement, licenseRequirement} = responseData

          this.authToken = token
          this.loginData.userType = userType
          // console.log({fullName, telephone, city, state, profilePhoto, laboratoryName, laboratoryAddress, eduRequirement, licenseRequirement, user})
          this.$store.commit('SET_USER', {token, email: user, profilePhoto, userType, fullName, telephone, city, state, laboratoryName, laboratoryAddress, eduRequirement, licenseRequirement})
        }
        if (this.$store.state.lastPageVisited > 0) {
          console.log('lastPageVisited', this.$store.state.lastPageVisited)
          this.$router.push(this.$store.state.lastPageVisited)
        } else if (this.$store.state.lastPage.trim().length > 0) {
          console.log('lastpage')
          this.$router.push(`${this.$store.state.lastPage}`)
        } else {
          // location.href = `/${this.$store.state.userType.replace(/\s/g, '')}-interface`
          this.$router.push(`/${this.$store.state.userType.replace(/\s/g, '')}-interface`)
        }
      } catch (error) {
        this.errorMsg = error.response.data
        if (error) {
          // console.log({error})
        }
        // console.log(this.errorMsg)
      }
    }
  }
}
</script>

<style>

/* #index > div.main.flow-text > div.content.center-align.white-text {
  font-size: 0.89rem !important;
  margin: 0 !important;
  font-weight: 100 !important;
    background-color: rgba(33, 150, 243, .25);
    min-width: 100%;
    /* min-height: auto; */
    /* -webkit-filter: brightness(.3); */
    /* filter: brightness(.3);
    width: auto;
    min-height: 890px !important;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: -webkit-transform 0.6s, opacity 0.6s;
    -webkit-transition: opacity 0.6s, -webkit-transform 0.6s;
    transition: opacity 0.6s, -webkit-transform 0.6s;
    transition: transform 0.6s, opacity 0.6s;
    transition: transform 0.6s, opacity 0.6s, -webkit-transform 0.6s;
    -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
} */
#index > div.main.flow-text > div.content.center-align.white-text > div > div > form > small{
  font-size: 0.89rem !important;
  margin: 0 !important;
  font-weight: 100 !important;
}
div.userTypes{
  margin-top: 1.26rem;
}
div.userTypes > p{
  opacity: 1;
  pointer-events: visible !important;
  display: inline;
  margin: 0.5rem;
}
div.userTypes>p>input{
  pointer-events: visible !important;
  opacity: 1 !important;
  height: 1.5rem;
  width: 1rem;
  position: relative !important;
  float: left !important;
}
div.userTypes>p>label{
  float: left;
  margin: 0 1.5rem;
  font-size: 1rem;
}
button#loginBtn {
    margin-top: 0rem;
    border-radius: 15px;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 9px 3px -3px rgba(0,0,0,0.42), 0 1px 5px 0 rgba(0,0,0,0.2);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 9px 3px -3px rgba(0,0,0,0.42), 0 1px 5px 0 rgba(0,0,0,0.2);
}

div.login form > div > div.input-field.col.s12 {
    margin: 0.7rem 0rem 0px 0px !important;
}

div.main.flow-text > div.content.center-align.white-text > div > div > form > div:nth-child(1){
  height: 6rem;
  line-height: 40px;
}

div.mainContent h3{
  width: initial;
}
#index > div.main.flow-text.wrapper > div.homeContent > img {
  width: 100%;
  filter: opacity(.6) !important;
  -webkit-filter: opacity(.6);
  /* z-index: -1; */
}

.file-field.input-field {
  position: relative;
  margin-top: -0.6rem;
}
label {
  font-weight: 100;
}
div.main.flow-text
  > div.content.center-align.white-text
  > div
  > div
  > form
  > a.a-f-arrow {
  right: 22rem;
}

.mainContent {
  width: 40%;
  padding-bottom: 2rem;
  margin: 2rem auto;
  border-radius: 13px;
  border-width: 1px;
  border-style: solid;
  border-color: grey;
  border-image: initial;
  background-color: #fff;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form {
  padding: 0 1rem;
  padding-top: 0.5rem;
}
input {
  color: #fff !important;
}

.mainContent h3 {
  top: 0;
  font-weight: 500;
  margin: 0px auto;
  width: 612px;
  border-top-right-radius: 13px;
  border-top-left-radius: 13px;
  padding: 0.8rem 0;
}
</style>
