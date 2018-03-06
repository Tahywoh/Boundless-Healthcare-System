<template>
  <div class="medlabScientist-profile">
    <!-- <fixednav/> -->
    <navbar>
      <template slot="navbar">
        <slot name="fixed-nav-bar">
          <li>
        <a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
        <li><a id="profile" class="btn transparent white-text waves-effect waves-light" @cllck="$eventBus.$emit('go-to-profile')">
          Profile
        </a></li>
        <li><a  class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('do-logout')">
        Logout
        </a>
      </li>
        </slot>
      </template>
    </navbar>
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
            <div class="profilePic right col s5">
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
            <div class="input-field col s6"><br/>
              <input id="pharmacyName" type="text" class="validate"  v-model="profile.laboratoryName" readonly>
              <label for="pharmacyName">Laboratory Name</label>
            </div>
          </div>
          <div class="row">
            <div class=" input-field col s12">
              <i class="icon ion-location"></i>
              <textarea type="text" class="validate materialize-textarea" readonly v-model="profile.laboratoryAddress"></textarea>
              <label for="address_profile">Laboratory Address:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  v-model="profile.eduRequirement" readonly>
              <label for="pharmacyName">Education Requirements:</label>
            </div>
            <div class="input-field col s6"><br/>
              <i class="icon ion-ios-paper"></i>
              <input type="text" class="validate"  v-model="profile.licenseRequirement" readonly>
              <label for="pharmacyName">License Requirements:</label>
            </div>
          </div>
    </div>
    <router-link ></router-link>
  </div>
</template>

<script>
import Navbar from '@/components/layouts/navbar'
export default {
  components: {Navbar},
  data () {
    return {
      profile: {
        fullName: `${this.$store.state.profile.fullName}`,
        email: `${this.$store.state.profile.user}`,
        telephone: `${this.$store.state.profile.telephone}`,
        city: `${this.$store.state.profile.city}`,
        state: `${this.$store.state.profile.state}`,
        laboratoryName: `${this.$store.state.profile.laboratoryName}`,
        laboratoryAddress: `${this.$store.state.profile.laboratoryAddress}`,
        eduRequirement: `${this.$store.state.profile.eduRequirement}`,
        licenseRequirement: `${this.$store.state.profile.licenseRequirement}`
      }
    }
  }
}
</script>


<style scoped>
div.medlabScientist-profile nav ul li a{
  font-size: 0.7rem !important;
}
div.medlabScientist-profile #basicDetailsProfile {
  margin-top: 9%;
}

#app > div > div.row.container.blue-grey.white-text.center-align > div > div.input-field.col > label, input :read-only+label, input:not([type]):disabled, input:not([type])[readonly="readonly"], input[type=text]:not(.browser-default):disabled, input[type=text]:not(.browser-default)[readonly="readonly"], input[type=password]:not(.browser-default):disabled, input[type=password]:not(.browser-default)[readonly="readonly"], input[type=email]:not(.browser-default):disabled, input[type=email]:not(.browser-default)[readonly="readonly"], input[type=url]:not(.browser-default):disabled, input[type=url]:not(.browser-default)[readonly="readonly"], input[type=time]:not(.browser-default):disabled, input[type=time]:not(.browser-default)[readonly="readonly"], input[type=date]:not(.browser-default):disabled, input[type=date]:not(.browser-default)[readonly="readonly"], input[type=datetime]:not(.browser-default):disabled, input[type=datetime]:not(.browser-default)[readonly="readonly"], input[type=datetime-local]:not(.browser-default):disabled, input[type=datetime-local]:not(.browser-default)[readonly="readonly"], input[type=tel]:not(.browser-default):disabled, input[type=tel]:not(.browser-default)[readonly="readonly"], input[type=number]:not(.browser-default):disabled, input[type=number]:not(.browser-default)[readonly="readonly"], input[type=search]:not(.browser-default):disabled, input[type=search]:not(.browser-default)[readonly="readonly"], textarea.materialize-textarea:disabled, textarea.materialize-textarea[readonly="readonly"]{
  color: #fff !important;
  font-weight: 500 !important;
  font-size: 15px !important;
}
</style>
