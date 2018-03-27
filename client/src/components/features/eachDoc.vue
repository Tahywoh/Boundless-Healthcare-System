<template>
  <div class="view-doc">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
        <li><a id="profile" class="btn transparent white-text waves-effect waves-light" :href="goToProfile">
          Profile
        </a></li>
          <li><a  class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('go-to-appointment')">Appointment
        </a>
        </li>
        <li><a  class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('do-logout')">
        Logout
        </a>
      </li>
      </template>
    </fixednav>
    <div class="doc-data">
      <h5 class="flow-text center blue white-text">Doctor {{profile.fullName}}</h5>
        <div class="col row s12 m8 offset-m2">
          <div id="basicDetailsProfile" class="col s7">
            <div class="profilePic col s3 right" v-if="profile.profilePhoto">
            <img :src="profile.profilePhoto" :alt="profile.fullName" class="responsive-img"> <!-- notice the "circle" class -->
        </div>
        <div class="profilePic center col s5" v-else>
          <i class="icon ion-android-contact x35 grey-text text-center center-align center" style="font-size: 10rem"></i>
        </div>
      </div>
          <div class="row">
            <div class=" input-field col s6"><br/>
              <input id="city" type="text" class="validate"  v-model="profile.city" readonly>
              <label for="specialty">City:</label>
            </div>
            <div class="input-field col s6">
              <i class="icon ion-location"></i>
              <input id="state" type="text" class="validate"  v-model="profile.state" readonly>
              <label for="state">State:</label>
            </div>
          </div>
          <div class="row">
            <div class=" input-field col s6"><br/>
              <input id="specialty" type="text" class="validate"  v-model="profile.specialty" readonly>
              <label for="specialty">Specialty:</label>
            </div>
            <div class="input-field col s6"><br/>
              <input id="hospitalName" type="text" class="validate"  v-model="profile.hospitalName" readonly>
              <label for="hospitalName">Hospital Name:</label>
            </div>
          </div>
          <div class="row">
            <div class=" input-field col s12">
              <i class="icon ion-location"></i>
              <textarea type="text" class="validate materialize-textarea" readonly v-model="profile.hospitalAddress"></textarea>
              <label for="address_profile">Hospital Address:</label>
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
      profile: this.$store.state.viewDoc,
      goToProfile: `/${this.$store.state.userType.replace(/\s/g, '')}-interface/profile`
    }
  }
}
</script>

<style scoped>
.btn {
  font-size: 0.7rem; 
}
#app > div > div.doc-data > div > div {
    padding: 2.5rem;
}
#app > div > div.doc-data > div > div:nth-child(4) > div > textarea {
  color: #000;
}
div.view-doc #basicDetailsProfile {
    padding: 1rem 1rem 4rem 5rem;
}
div.view-doc div.doc-data[data-v-3e0160c8] {
    padding-top: 0rem;
    background: rgba(33, 150, 243, 0.15);
}
div.view-doc div.row.s12.m8.offset-m2[data-v-3e0160c8] {
    /* border-top-left-radius: 73px; */
    padding: 1.5rem 1.7rem;
    border: 7px solid sandybrown;
    background-color: white;
    /* border-bottom-right-radius: 73px; */
    /* border-top-right-radius: 73px; */
    /* border-bottom-left-radius: 73px; */
    width: 80%;
    border-radius: 40px;
}
.view-doc h5.flow-text.center.blue.white-text {
    padding: 0.7rem;
    font-weight: 400;
}
div.view-doc #basicDetailsProfile > div > img {
  border-radius: 11px;
}
</style>
