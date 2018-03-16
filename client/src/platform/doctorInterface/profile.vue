<template>
  <div class="doctor-profile">
     <fixednav/>
     <div class="profileWra">
      <div class="row container blue-grey white-text center-align">
          <div class="row">
            <div id="basicDetailsProfile" class="col s7">
              <p class="field">
                Full Name: <br/><span>{{profile.fullName}}</span>
              </p>
              <p class="field">
                Email Address: <br/><span>{{profile.email}}</span>
              </p>
            </div>
            <div class="profilePic col s3 right" v-if="profile.photoUrl">
              <img :src="profile.photoUrl" :alt="profile.fullName" class="circle responsive-img"> <!-- notice the "circle" class -->
            </div>
            <div class="profilePic right col s5" v-else>
              <i class="icon ion-android-contact x35 white-text text-center center-align" style="font-size: 10rem"></i>
            </div>
          </div>
          <div class="row">
              <div class="input-field col s6">
                <i class="icon ion-android-call"></i>
                 <input id="telephone" type="number" class="validate autofocus"  v-model="profile.telephone" readonly>
                <label for="telephone">Telephone:</label>
              </div>
            <div class="input-field col s6">
              <i class="icon ion-location"></i>
              <input id="city" type="text" class="validate"  v-model="profile.city" readonly>
              <label for="city">City:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <i class="icon ion-location"></i>
              <input id="state" type="text" class="validate"  v-model="profile.state" readonly>
              <label for="state">State:</label>
            </div>
            <div class=" input-field col s6"><br/>
              <input id="specialty" type="text" class="validate"  v-model="profile.specialty" readonly>
              <label for="specialty">Specialty:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6"><br/>
              <input id="hospitalName" type="text" class="validate"  v-model="profile.hospitalName" readonly>
              <label for="hospitalName">Hospital Name:</label>
            </div>
            <div class=" input-field col s6">
              <i class="icon ion-location"></i>
              <textarea type="text" class="validate materialize-textarea" readonly v-model="profile.hospitalAddress"></textarea>
              <label for="address_profile">Hospital Address:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  v-model="profile.eduRequirement" readonly>
              <label for="hospitalName">Education Requirements:</label>
            </div>
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  v-model="profile.licenseRequirement" readonly>
              <label for="hospitalName">License Requirements:</label>
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
      }
    }
  }
}
</script>

<style scoped>
#app > div > div.profileWra > div > div:nth-child(1) > div.profilePic.col.s3.right {
  margin-top: 2rem;
}
div.doctor-profile #basicDetailsProfile {
  margin-top: 9%;
}
i.icon.ion-ios-paper{
  margin-left: 5rem;
}
#app > div > div.main-interface > div:nth-child(3) {
    margin-left: 25%;
    display: none;
}
#basicDetails{
  margin-top: 4.5rem;
}
#app > div > div.row.container.blue-grey.white-text.center-align > div {
    padding: 0.1rem 1.5rem;
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
