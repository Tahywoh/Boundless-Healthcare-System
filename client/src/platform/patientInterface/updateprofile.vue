<template>
  <div class="patient-update-profile">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
        <li><a id="profile" class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('go-to-profile')">
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
      <div class="col s2 offset-s5" v-if="profileData.photoUrl !== undefined">
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
            <input id="email" type="email" class="validate" :value="profileData.email" disabled>
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
        </div>
        <div class="row">
          <div class=" input-field col s12">
            <i class="icon ion-location"></i>
            <textarea id="addressProfileUpdate" type="text" class="validate materialize-textarea" data-length="50" v-model="profileData.address"></textarea>
            <label for="address_profile" class="active">Address</label>
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
          <button class="center-align blue btn waves-light waves-effect" @click="updatePatientProfile">Submit</button></div></div>
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
  name: 'patientUpdateProfile',
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
      goToAppointment: navs.links.appointment.url,
      profileData: {
        fullName: `${this.$store.state.profile.fullName}`,
        email: `${this.$store.state.profile.user}`,
        telephone: `${this.$store.state.profile.telephone}`,
        city: `${this.$store.state.profile.city}`,
        state: `${this.$store.state.profile.state}`,
        address: `${this.$store.state.profile.address}`,
        photoUrl: `${this.$store.state.profile.profilePhoto}`
      }
    }
  },
  methods: {
    upload (formData) {
      // const url = `https://server-dvvtkzhghy.now.sh/handlePhoto/imgUpload`
      const url = `http://localhost:8050/handlePhoto/imgUpload`
      return axios.post(url, formData)
      // get data
        .then((x) => {
          if (x) {
            // console.log({x})
            this.profileData.photoUrl = x.data
            console.log(this.profileData.photoUrl)
          }
        })
      // // add url field
      //     .then(x => x.map(img => Object.assign({},
      //       img, { url: `http:localhost:8050/public/uploads/${img.id}` })))
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
    async updatePatientProfile () {
      let validateProfileData = {}
      validateProfileData.telephone = this.profileData.telephone
      if (this.profileData.photoUrl) {
        validateProfileData.profilePhoto = this.profileData.photoUrl
      }
      if (this.profileData.fullName && this.profileData.fullName.length >= 7) {
        validateProfileData.fullName = this.toCapitalize(this.profileData.fullName)
      } else {
        this.errorMsg = 'Enter a valid full name!'
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
      if (this.profileData.address && this.profileData.address.length > 11) {
        validateProfileData.address = this.profileData.address
      } else {
        this.errorMsg = 'A valid address is required to serve you better'
        return false
      }
      if (this.isValidEmail(this.profileData.email) && this.profileData.email !== '') {
        validateProfileData.email = this.profileData.email
      } else {
        this.errorMsg = 'Invalid email address'
        return false
      }
      console.log(JSON.stringify(validateProfileData, null, 3))
      try {
        const newUserData = await AuthServices.updatePatientProfile(validateProfileData)
        console.log(JSON.stringify(newUserData, null, 2))
        alert('Your profile has been successfully updated. You need to log out and login to apply changes')
      } catch (error) {
        console.log({error})
        console.log({newData: error.newUserData})
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
  },
  mounted () {
    this.reset()
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
