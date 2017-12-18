<template>
  <div class="registration center-align">
    <index>
      <div slot="indexMainContent" class="mainContent center-align">
        <h3 class="blue white-text">Registration</h3>
        <form class="col s6" @submit.prevent="validateForm" autocomplete @input="errorMsg" autofocus>
          <div id="field1">
            <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-android-contact"></i>
                <input  type="text"  name="fullName" v-model="formData.fullName" required>
                <label >Full Name</label>
              </div>
              <div class="input-field col s6">
                <i class="icon ion-android-mail"></i>
                <input type="email"  name="email" v-model="formData.email" required>
                <label for="email">Email</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-android-call"></i>
                <input id="telephone" type="number" class="validate" name="telephone" v-model="formData.telephone" required>
                <label for="telephone">Telephone</label>
              </div>
              <div class="input-field col s6">
                <input id="age" type="number" class="validate" name="age" v-model="formData.age" required>
                <label for="age">Age</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-location"></i>
                <input id="city" type="text" class="validate" name="city" v-model="formData.city" required>
                <label for="city">City</label>
              </div>
              <div class="input-field col s6">
                <i class="icon ion-location"></i>
                <input type="text" class="validate" name="state" v-model="formData.state" required>
                <label for="state">State</label>
              </div>
            </div>            
          </div>
 

          <div id="field2" style="display: none">
            <div class="row">
              <small class="successMsg blue-text center-align" v-html="successMsg"></small>
              <div class="input-field col s5">
                <select class="browser-default waves-effect waves-light btn blue" style="class:  browser" name="gender" v-model="formData.gender" required>
                  <option value="" disabled selected>Select gender</option>
                  <option v-for="option in options" v-bind:value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <label>Gender</label>         
              </div>
              <div class="input-field col s7">
                <i class="icon ion-ios-contact"></i>
                <div class="file-field input-field">
                  <div class="btn bg-for-tab blue">
                  <span >Photo</span>
                  <input type="file"  name="profilePhoto">
                </div>
                <div class="file-path-wrapper">
                  <input  class="file-path validate" type="text">
                </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                 <input id="Address"  type="text" class="validate" name="address" v-model="formData.address" required>
                 <label for="Address">Residential Address</label>
               </div>
            </div>
             <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-eye-disabled"></i>
                <input  type="password" class="validate" name="password" v-model="formData.password" required>
                <label >Password</label>
              </div>
              <div class="input-field col s6">
                <i class="icon ion-eye-disabled"></i>
                <input type="password" class="validate" id="confirmPassword" name="confirmPassword" v-model="formData.confirmPassword" required>
                <label for="confirmPassword">Confirm Password</label>
              </div>
            </div>
            <small class="red-text center-align errorMsg" v-html="errorMsg"></small>
          </div>
          
           <a @click="triggerField2" id="proceedBtn" class="btn blue white-text waves-effect waves-grey right a-f-arrow show" ><i class="icon ion-android-arrow-forward" ></i></a>
           <a @click="triggerField1" class="btn blue white-text waves-effect waves-grey right a-b-arrow blue white-text hide" id="backwordBtn"><i class="icon ion-android-arrow-back" ></i></a>
           <button  class="btn text-center blue submit-btn hide"  id="submitBtn" @click="registerPatient">Submit</button>
          
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
  name: 'registerPatient',
  components: { Index },
  data () {
    return {
      errorMsg: '',
      successMsg: '',
      formData: {
        fullName: '',
        email: '',
        telephone: '',
        age: '',
        city: '',
        state: '',
        gender: '',
        address: '',
        password: '',
        confirmPassword: ''
      },
      options: [
        {text: 'Male', value: 'Male'},
        {text: 'Female', value: 'Femaale'}
      ],
      show: 'show'
    }
  },
  methods: {
    triggerField2 () {
      let field1 = document.getElementById('field1')
      let field2 = document.getElementById('field2')
      let proceedBtn = document.getElementById('proceedBtn')
      let backwordBtn = document.getElementById('backwordBtn')
      let submitButton = document.getElementById('submitBtn')
      field1.style.display = 'none'
      field2.style.display = 'block'
      proceedBtn.classList.remove('show')
      proceedBtn.style.display = 'none'
      backwordBtn.classList.add('show')
      submitButton.classList.remove('hide')
    },
    triggerField1 () {
      let field1 = document.getElementById('field1')
      let field2 = document.getElementById('field2')
      let proceedBtn = document.getElementById('proceedBtn')
      let backwordBtn = document.getElementById('backwordBtn')
      let submitButton = document.getElementById('submitBtn')
      field2.style.display = 'none'
      field1.style.display = 'block'
      backwordBtn.classList.remove('show')
      backwordBtn.style.display = 'none'
      proceedBtn.classList.remove('hide')
      proceedBtn.classList.add('show')
      proceedBtn.style.display = 'block'
      submitButton.classList.add('hide')
      // console.log('am working....')
    },
    isValidEmail (email) {
      if (!email || email === '') {
        return false
      }
      email = email.trim()
      if (email === '' || !email) {
        return false
      }
      let regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      return regex.test(email)
    },
    validateForm (e) {},
    async registerPatient () {
      let validateReg = {}
      console.log(this.formData)
      // validateReg.gender = this.formData.gender
      validateReg.age = this.formData.age
      validateReg.telephone = this.formData.telephone
      // validating the form data
      if (this.formData.fullName && this.formData.fullName.length >= 7) {
        validateReg.fullName = this.formData.fullName
      } else {
        this.errorMsg = 'Enter a valid name!'
        return false
      }
      if (this.formData.city && this.formData.city.length >= 3) {
        validateReg.city = this.formData.city
      } else {
        this.errorMsg = 'Enter a valid city name!'
        return false
      }
      if (this.formData.state && this.formData.state.length >= 3) {
        validateReg.state = this.formData.state
      } else {
        this.errorMsg = 'You must provide your state'
        return false
      }
      if (this.formData.gender === '') {
        this.errorMsg = 'You must choose your gender'
      } else if (this.formData.gender === 'Male' || this.formData.gender === 'Female') {
        validateReg.gender = this.formData.gender
      }
      if (this.formData.address && this.formData.address.length > 11) {
        validateReg.address = this.formData.address
      } else {
        this.errorMsg = 'A valid address is required to serve you better'
        return false
      }
      if (this.isValidEmail(this.formData.email) && this.formData.email !== '') {
        validateReg.email = this.formData.email
      } else {
        this.errorMsg = 'Invalid email address'
        return false
      }
      if (this.formData.password === this.formData.confirmPassword && this.formData.password !== '' && this.formData.password.length >= 5) {
        validateReg.password = this.formData.password
        validateReg.confirmPassword = this.formData.confirmPassword
      } else if (validateReg.password !== validateReg.confirmPassword) {
        this.errorMsg = 'Passwords do not match!'
        return false
      } else if (validateReg.password === '' || validateReg.password === null) {
        this.errorMsg = 'Password is required!'
        return false
      } else {
        this.errorMsg = 'Your password must be atleast 4 characters!'
        return false
      }
      try {
        const response = await AuthService.registerPatient(validateReg)
        console.log(response.data)
        this.successMsg = 'You have been successfully registered\n You now will be redirected to login page'
        this.errorMsg = ''
        setTimeout(() => {
          this.$router.push('/login')
        }, 3900)
      } catch (error) {
        this.errorMsg = error.response.data
        console.log(JSON.stringify(this.errorMsg, null, 2))
        console.log(error.response.status, error.response.statusText)
      }
    }
  }
}
</script>

<style>
#field2 > small.errorMsg, #field2 > small.successMsg{
  font-size: 0.89rem !important;
  margin: 0 !important; 
  font-weight: 100 !important;
}
.hideMe{
  display: none !important;
}
div.main img{
  width: 100%;
  filter: brightness(.79) !important;
  z-index: -1;
}
option, option:disabled{
  background-color: gray;
}
.file-field.input-field {
    position: relative;
    margin-top: -0.6rem;
}
#field1 > div > div {
    margin: 0.95rem 0 !important;
}
label {
    font-weight: 100;
}
i.icon.ion-android-arrow-forward, i.icon.ion-android-arrow-back {
    font-size: 3rem;
    position: absolute;
    right: 0.5rem;
    bottom: -0.29rem;
}
.a-b-arrow{
  left: 23rem;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form > a {
    /* font-size: 3rem; */
    position: absolute;
    /* right: 22rem; */
    bottom: 3.5rem;
    border-radius: 50%;
    padding: 0rem 1.5rem;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form > a.a-f-arrow{
  right: 22rem;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form > a.a-b-arrow {
    left: 22rem;
}
.show{
  display: block !important;
}

.mainContent {
    width: 45%;
    height: 85vh;
    margin: 2rem auto;
    border-radius: 13px;
    border-width: 1px;
    border-style: solid;
    border-color: grey;
    border-image: initial;
    background-color: #fff;
}
div.main.flow-text > div.content.center-align.white-text > div > div > form{
  padding: 0 1rem;
}
input{
  color: #fff !important;
}
#field1 > div > div > i, #field2 > div > div > i {
    color: #2196f3;
}
#field2 > div > div {
    margin: 0.8rem 0 !important;
}
.mainContent h3 {
    top: 0;
    font-weight: 500;
    margin: 0px auto;
    width: initial;
    border-top-right-radius: 13px;
    border-top-left-radius: 13px;
    padding: 0.8rem 0;
}
select.browser-default.waves-effect.waves-light.btn {
    opacity: 1;
    height: 35px;
    width: 80%;
    top: 2.5rem;
    left: 0.8rem;
    pointer-events: visible !important;
}

</style>
