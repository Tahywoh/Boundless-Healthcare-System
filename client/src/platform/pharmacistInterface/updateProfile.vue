<template>
  <div class="pharmacist-update-profile">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <router-link to="/" class="btn transparent white-text waves-effect waves-light">Home</router-link></li>
        <li><router-link id="profile" class="btn transparent white-text waves-effect waves-light" :to="goToProfile">
          Profile
        </router-link></li>
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
          <div class="input-field col s6"><br/>
              <input id="pharmacyName" type="text" class="validate"  v-model="profileData.pharmacyName">
              <label for="pharmacylName" class="active">Pharmacy Name</label>
          </div>
        </div>
         <div class="row">
            <div class=" input-field col s12">
              <i class="icon ion-location"></i>
              <textarea type="text" class="validate materialize-textarea" v-model="profileData.pharmacyAddress"></textarea>
              <label for="address_profile" class="active">Pharmacy Address</label>
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
                <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
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
          <a class="center-align blue btn waves-light waves-effect" @click="updatePharmacistProfile">Submit</a></div></div>
      </form>
    </div>
  </div>
  <router-view></router-view>
  </div>
</template>

<script>
import Fixednav from '@/components/layouts/fixednav'
import navs from './navs'
import AuthServices from '@/services/authServices'
import * as axios from 'axios'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
export default {
  components: {Fixednav},
  props: {
    id: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      imgUrl: '',
      profileData: {
        fullName: `${this.$store.state.profile.fullName}`,
        email: `${this.$store.state.profile.email}`,
        telephone: `${this.$store.state.profile.telephone}`,
        city: `${this.$store.state.profile.city}`,
        state: `${this.$store.state.profile.state}`,
        pharmacyName: `${this.$store.state.profile.pharmacyName}`,
        pharmacyAddress: `${this.$store.state.profile.pharmacyAddress}`,
        eduRequirement: `${this.$store.state.profile.eduRequirement}`,
        photoUrl: `${this.$store.state.profile.profilePhoto}`,
        licenseRequirement: `${this.$store.state.profile.licenseRequirement}`
      },
      goToProfile: navs.links.profile.url
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
    upload (formData) {
      // const url = `https://server-dvvtkzhghy.now.sh/handlePhoto/imgUpload`
      const url = `http://localhost:3050/handlePhoto/imgUpload`
      return axios.post(url, formData)
      // get data
        .then((x) => {
          if (x) {
            // console.log({x: x.dgata})
            this.profileData.photoUrl = x.data
            console.log({photoUrl: this.profileData.photoUrl})
          }
        })
      // // add url field
      //     .then(x => x.map(img => Object.assign({},
      //       img, { url: `http:localhost:3050/public/uploads/${img.id}` })))
    },
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      this.upload(formData)
        .then(x => {
          this.imgUrl = x.data
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
          this.$eventBus.$emit('img-uploaded', {
            index: this.id,
            url: x.data
          })
        })
        .catch(err => {
          if (err) {
            // alert('Error uploading your image. Please try again or ignore and proceed')
            console.log(JSON.stringify(err))
            // this.uploadError = err.response
            // console.log(JSON.stringify(this.uploadError))
            // alert(JSON.stringify(this.uploadError.data))
            this.currentStatus = STATUS_FAILED
            // return
          }
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      this.save(formData)
    },
    closeUploader () {
      // if (this.imgUrl.length > 0) {
      //   this.$eventBus.$emit('delete-image-url')
      // }
    },
    async updatePharmacistProfile () {
      let validateProfileData = {}
      console.log(this.formData)
      validateProfileData.telephone = this.profileData.telephone
      if (this.profileData.photoUrl) {
        validateProfileData.profilePhoto = this.profileData.photoUrl
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
        return false
      }
      if (this.profileData.pharmacyName && this.profileData.pharmacyName.length >= 7) {
        validateProfileData.pharmacyName = this.profileData.pharmacyName
      } else {
        this.errorMsg = 'invalid pharmacy name<br/>Please enter a valid name of hospital'
        return false
      }
      if (this.profileData.pharmacyAddress && this.profileData.pharmacyAddress.length >= 10) {
        validateProfileData.pharmacyAddress = this.profileData.pharmacyAddress
      } else {
        this.errorMsg = 'A valid address of Pharmacy is required to serve you better'
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
        const newUserData = (await AuthServices.updatePharmacistProfile(validateProfileData)).data
        alert('Your profile has been successfully updated.\nYou need to log out and login to apply changes')
        return newUserData
      } catch (error) {
        this.errorMsg = error.response.data
        console.log(JSON.stringify(this.errorMsg, null, 2))
        console.log(error.response.status, error.response.statusText)
      }
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    },
    dropformstyle () {
      if (!this.isSuccess) {
        return {outline: '2px dashed grey'}
      } else {
        return {}
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
