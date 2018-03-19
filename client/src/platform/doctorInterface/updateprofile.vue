<template>
  <div class="doctor-update-profile">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
        <li><a id="profile" class="btn transparent white-text waves-effect waves-light" :href="goToProfile">
          Profile
        </a></li>
          <li><a  class="btn transparent white-text waves-effect waves-light" :href="goToAppointment">Appointment
        </a>
        </li>
        <li><a  class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('do-logout')">
        Logout
        </a>
      </li>
      </template>
    </fixednav>
    
    <div class="update-profile-data">
    <h5 class="flow-text center">Update Profile</h5>
      <div class="row">
      <form class="col s12 m8 offset-m2">
        <div class="row">
      <div class="col s2 offset-s5" v-if="profileData.photoUrl">
      <img :src="profileData.photoUrl" :alt="profileData.fullName" class="circle responsive-img"> <!-- notice the "circle" class -->
      </div>
      <div class="col s2 offset-s5" v-else>
      <img src="../../assets/platform/mygpix.png" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
      </div>

    </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="full_name" type="text" class="validate" v-model="profileData.fullName">
            <label for="full_name" class="active">Full Name</label>
          </div>
          <div class="input-field col s6">
            <input id="email" type="email" class="validate" v-model="profileData.email" disabled>
            <label for="email" class="active">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <i class="icon ion-android-call"></i>
            <input id="telephone" type="number" class="validate autofocus" v-model="profileData.telephone">
            <label for="telephone" class="active">Telephone</label>
          </div>
          <div class="input-field col s6">
            <i class="icon ion-location"></i>
            <input id="city" type="text" class="validate" v-model="profileData.city" >
            <label for="city" class="active">City</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <i class="icon ion-location"></i>
            <input id="state" type="text" class="validate" v-model="profileData.state">
            <label for="state" class="active">State</label>
          </div>
          <div class=" input-field col s6"><br/>
              <input id="specialty" type="text" class="validate"  v-model="profileData.specialty">
              <label for="specialty" class="active">Specialty</label>
            </div>
        </div>
         <div class="row">
            <div class="input-field col s6"><br/>
              <input id="hospitalName" type="text" class="validate"  v-model="profileData.hospitalName">
              <label for="hospitalName" class="active">Hospital Name</label>
            </div>
            <div class=" input-field col s6">
              <i class="icon ion-location"></i>
              <textarea type="text" class="validate materialize-textarea" v-model="profileData.hospitalAddress"></textarea>
              <label for="address_profile" class="active">Hospital Address</label>
            </div>
          </div>
         <div class="row">
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  v-model="profileData.eduRequirement">
              <label for="hospitalName" class="active">Education Requirements:</label>
            </div>
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  v-model="profileData.licenseRequirement">
              <label for="hospitalName" class="active">License Requirements:</label>
            </div>
          </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="icon ion-ios-contact"></i>
            <div class="file-field input-field">
                <div class="btn bg-for-tab blue">
                <span>
                  Photo
                </span>
                <input type="file"  accept="image/*" class="input-file">
              </div>
              <div class="file-path-wrapper">
                <input  class="file-path validate" type="text">
                <i class="fa fa-spinner fa-pulse right" v-if="isSaving"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="row"><div class="col s4 offset-s4">
          <a class="center-align blue btn waves-light waves-effect" @click="updateDoctorProfile">Submit</a></div></div>
      </form>
    </div>
  </div>
  <router-view></router-view>
  </div>
</template>

<script>
import Fixednav from '@/components/layouts/fixednav'
import AuthServices from '@/services/authServices'
import navs from './navs'
export default {
  components: {Fixednav},
  data () {
    return {
      profileData: {
        fullName: `${this.$store.state.profile.fullName}`,
        email: `${this.$store.state.profile.user}`,
        telephone: `${this.$store.state.profile.telephone}`,
        city: `${this.$store.state.profile.city}`,
        state: `${this.$store.state.profile.state}`,
        photoUrl: `${this.$store.state.profile.profilePhoto}`,
        specialty: `${this.$store.state.profile.specialty}`,
        hospitalName: `${this.$store.state.profile.hospitalName}`,
        hospitalAddress: `${this.$store.state.profile.hospitalAddress}`,
        eduRequirement: `${this.$store.state.profile.eduRequirement}`,
        licenseRequirement: `${this.$store.state.profile.licenseRequirement}`
      },
      goToProfile: navs.links.profile.url,
      goToAppointment: navs.links.appointment.url
    }
  },
  methods: {
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
    async updateDoctorProfile () {
      let validateProfileData = {}
      validateProfileData.telephone = this.profileData.telephone
      if (this.profileData.profilePhoto) {
        validateProfileData.profilePhoto = this.profileData.profilePhoto
      }
      // validating form data
      if (this.profileData.fullName && this.profileData.fullName.length >= 7) {
        validateProfileData.fullName = this.toCapitalize(this.profileData.fullName)
      } else {
        this.errorMsg = 'Enter a valid full name!'
        return false
      }
      if (this.isValidEmail(this.profileData.email) && this.profileData.email !== '') {
        validateProfileData.email = this.profileData.email
      } else {
        this.errorMsg = 'Invalid email address'
        return false
      }
      if (this.profileData.city && this.profileData.city.length >= 3) {
        validateProfileData.city = this.profileData.city
      } else {
        this.errorMsg = 'Enter a valid city name!'
        return false
      }
      if (this.profileData.state && this.profileData.state.length >= 3) {
        validateProfileData.state = this.profileData.state
      } else {
        this.errorMsg = 'You must provide your state'
        // return false
      }
      if (this.profileData.hospitalName && this.profileData.hospitalName.length >= 7) {
        validateProfileData.hospitalName = this.profileData.hospitalName
      } else {
        this.errorMsg = 'Please enter a valid name of hospital'
        return false
      }
      if (this.profileData.hospitalAddress) {
        validateProfileData.hospitalAddress = this.formData.hospitalAddress
      } else {
        this.errorMsg = 'A valid address of hospital is required to serve you better'
        // return false
      }
      if (this.profileData.specialty && this.profileData.specialty.length >= 7) {
        validateProfileData.specialty = this.profileData.specialty
      } else {
        this.errorMsg = 'Please enter a valid medical specialty'
        return false
      }
      if (this.profileData.eduRequirement && this.profileData.eduRequirement.length >= 10) {
        validateProfileData.eduRequirement = this.profileData.eduRequirement
      } else {
        this.errorMsg = 'Please enter a valid education certificate details!'
        return false
      }
      if (this.profileData.licenseRequirement && this.profileData.licenseRequirement.length >= 7) {
        validateProfileData.licenseRequirement = this.profileData.licenseRequirement
      } else {
        this.errorMsg = 'Please enter a valid license details<br/>This is required to serve you better.'
      }

      try {
        const newUserData = (await AuthServices.updateDoctorProfile(validateProfileData)).data
        console.log(JSON.stringify(newUserData, null, 2))
        alert('Your profile has been successfully updated. You need to log out and login to apply changes')
      } catch (error) {
        console.log(error)
        console.log({newData: error.newUserData})
      }
    }
  }
}
</script>

<style scoped>
#app > div > div.update-profile-data > div > form {
    border-top-left-radius: 73px;
    padding: 1.5rem 1.7rem;
    border: 7px groove sandybrown;
    background-color: white;
    border-bottom-right-radius: 73px;
}
  #nav-mobile > li > a {
    font-size: 0.7rem !important;
    padding: 0 1rem !important;
}
#app > div > div.update-profile-data > div {
    padding-top: 3rem;
    background: rgba(33, 150, 243, .15);
}
#app > div > div.update-profile-data > div > form > div > div {
    padding: 0.7rem;
}
</style>
