<template>
  <div class="medlabScientist-profile">
    <!-- <fixednav/> -->
    <fixednav>
      <template slot = "fixed-nav-bar">
        <li>
        <router-link to="/" class="btn transparent white-text waves-effect">Home</router-link></li>
        <li><a id="profile" class="btn transparent white-text waves-effect" @cllck="$eventBus.$emit('go-to-profile')">
          Profile
        </a></li>
        <li><a  class="btn transparent white-text waves-effect" @click="$eventBus.$emit('do-logout')">
        Logout
        </a>
      </li>
      </template>
    </fixednav>
    <div class="profileWra">
      <h5 class="flow-text center">Personal Information</h5>
      <div class="row container blue-grey white-text center-align">
          <div class="row">
            <div id="basicDetailsProfile" class="col s7">
              <p class="field">
                Full Name: <br/><span>{{profile.fullName}}</span>
              </p>
              <br/>
              <p class="field">
                Email Address: <br/><span>{{profile.email}}</span>
              </p>
            </div>
            <div class="profilePic col s3 right" v-if="profile.photoUrl">
              <img :src="profile.photoUrl" alt="user photo" class="circle responsive-img"> <!-- notice the "circle" class -->
            </div>
            <div class="profilePic right col s5" v-else>
              <i class="icon ion-android-contact x35 white-text text-center center-align" style="font-size: 10rem"></i>
            </div>
          </div>
          <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-android-call"></i>
                 <input id="telephone" type="number" class="validate autofocus"  v-model="profile.telephone" readonly>
                <label for="telephone" class="active">Telephone:</label>
              </div>
            <div class="input-field col s6">
              <i class="icon ion-location"></i>
              <input id="city" type="text" class="validate"  v-model="profile.city" readonly>
              <label for="city" class="active">City:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <i class="icon ion-location"></i>
              <input id="state" type="text" class="validate"  v-model="profile.state" readonly>
              <label for="state" class="active">State:</label>
            </div>
            <div class="input-field col s6"><br/>
              <input id="pharmacyName" type="text" class="validate"  v-model="profile.laboratoryName" readonly>
              <label for="pharmacyName" class="active">Laboratory Name</label>
            </div>
          </div>
          <div class="row">
            <div class=" input-field col s12">
              <i class="icon ion-location"></i>
              <textarea type="text" class="validate materialize-textarea" readonly v-model="profile.laboratoryAddress"></textarea>
              <label for="address_profile" class="active">Laboratory Address:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  v-model="profile.eduRequirement" readonly>
              <label for="pharmacyName" class="active">Education Requirements:</label>
            </div>
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  v-model="profile.licenseRequirement" readonly>
              <label for="pharmacyName" class="active">License Requirements:</label>
            </div>
          </div>
    </div>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
import Fixednav from '@/components/layouts/fixednav'
export default {
  components: {Fixednav},
  data () {
    return {
      profile: {
        fullName: this.$store.state.profile.fullName,
        email: this.$store.state.profile.email,
        telephone: this.$store.state.profile.telephone,
        city: this.$store.state.profile.city,
        state: this.$store.state.profile.state,
        photoUrl: this.$store.state.profile.profilePhoto,
        laboratoryName: this.$store.state.profile.laboratoryName,
        laboratoryAddress: this.$store.state.profile.laboratoryAddress,
        eduRequirement: this.$store.state.profile.eduRequiremen,
        licenseRequirement: this.$store.state.profile.licenseRequiremen
      }
    }
  }
}
</script>


<style scoped>
#app > div > div.profileWra {
  padding-top: 2rem;
}
#app > div > div.profileWra > div > div {
  padding: 2rem 0.4rem;
}
div.medlabScientist-profile nav ul li a{
  font-size: 0.7rem !important;
}
div.medlabScientist-profile #basicDetailsProfile {
  margin-top: 9%;
}
#app > div > div.profileWra > div {
    border-top-left-radius: 73px;
    padding: 1.5rem 1.7rem;
    border: 7px groove sandybrown;
    border-bottom-right-radius: 73px;
}
#app > div > div.profileWra {
    padding-top: 2rem;
}

#app > div > div.row.container.blue-grey.white-text.center-align > div > div.input-field.col > label, input :read-only+label, input:not([type]):disabled, input:not([type])[readonly="readonly"], input[type=text]:not(.browser-default):disabled, input[type=text]:not(.browser-default)[readonly="readonly"], input[type=password]:not(.browser-default):disabled, input[type=password]:not(.browser-default)[readonly="readonly"], input[type=email]:not(.browser-default):disabled, input[type=email]:not(.browser-default)[readonly="readonly"], input[type=url]:not(.browser-default):disabled, input[type=url]:not(.browser-default)[readonly="readonly"], input[type=time]:not(.browser-default):disabled, input[type=time]:not(.browser-default)[readonly="readonly"], input[type=date]:not(.browser-default):disabled, input[type=date]:not(.browser-default)[readonly="readonly"], input[type=datetime]:not(.browser-default):disabled, input[type=datetime]:not(.browser-default)[readonly="readonly"], input[type=datetime-local]:not(.browser-default):disabled, input[type=datetime-local]:not(.browser-default)[readonly="readonly"], input[type=tel]:not(.browser-default):disabled, input[type=tel]:not(.browser-default)[readonly="readonly"], input[type=number]:not(.browser-default):disabled, input[type=number]:not(.browser-default)[readonly="readonly"], input[type=search]:not(.browser-default):disabled, input[type=search]:not(.browser-default)[readonly="readonly"], textarea.materialize-textarea:disabled, textarea.materialize-textarea[readonly="readonly"]{
  color: #fff !important;
  font-weight: 500 !important;
  font-size: 15px !important;
}
</style>
