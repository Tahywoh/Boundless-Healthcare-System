<template>
  <div class="login center-align">
    <index>
      <div slot="indexMainContent" class="mainContent center-align">
        <h3 class="blue white-text">Login</h3>
        <form class="col s6 center-align center" @input="errorMsg" @submit.prevent="signInUsers" autocomplete="">
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
              <label>User type</label>
              <i class="icon ion-android-person blue-text"></i>
              <br/>
              <div class="userTypes">
                 <p><label for="Patient">Patient</label>
                <input name="userType" type="radio" id="patient" />
                
                </p>
                <p><label for="doctor">Doctor</label>
                  <input name="userType" type="radio" id="doctor" />
                  
                </p>
                <p><label for="pharmacist">Pharmacist</label>
                <input  name="userType" type="radio" id="pharmacist"  />
                <br/>
                </p>
                <p><label for="labscientist">Medical lab scientist</label>
                <input  name="userType" type="radio" id="labscientist"  />
                
                </p>
              </div>
             
            </div>
          </div>
             <small class="red-text errorMsg center-align" v-html="errorMsg"></small>
           <button  class="btn text-center blue submit-btn waves-effect waves-grey" id="loginBtn" @click="signInUsers"
           >Login</button>
          
      </form>
      </div>
    </index>
    <router-view></router-view>
  </div>
</template>

<script>
import Index from '@/platform/index'
import AuthService from '@/services/authService'
export default {
  name: 'signin',
  components: { Index },
  data () {
    return {
      errorMsg: '',
      loginData: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    async signInUsers () {
      // let validateLogin = {
      //   user: this.loginData.user,
      //   password: this.loginData.password
      // }
      try {
        const response = await AuthService.signInUsers({
          user: this.loginData.user,
          password: this.loginData.password
        })
        console.log(response.data)
        // setTimeout(() => {
        //   this.$router.push('/user-interface')
        // }, 2500)
      } catch (error) {
        this.errorMsg = error.response.data
        console.log(JSON.stringify(this.errorMsg, null, 3))
      }
    }
  }
}
</script>

<style>
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
div.main img {
  width: 100%;
  filter: brightness(0.79) !important;
  z-index: -1;
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
  height: 85vh;
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
