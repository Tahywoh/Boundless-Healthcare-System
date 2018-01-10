<template>
  <div class="medical-lab-scientist-dashboard">
    <interface>
      <template slot="fixed-nav-bar">
          <li><a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
          <li><a  id="profile" class="btn transparent white-text waves-effect waves-light">
          Profile
          </a></li>
          <li><a  class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('do-logout')">
          Logout
          </a>
          </li>
      </template>

      <template slot="basic-details">
        <basicDetails/>
      </template>

      <template slot="side-nav-content">
        <div class="divider"></div>
        <a href="#" class="w3-bar-item w3-button">
          <i :class="appointment_icon"></i>
          &nbsp;Appointments
          <span class="circle blue notification-circle">6</span>
        </a>
        <div class="divider"></div>
        <a href="#" class="w3-bar-item w3-button">
          <i :class="updateprofile_icon"></i>
          Update Profile
        </a>
      </template>

      <template slot="user-type-img">
         <img src="../../assets/platform/medlab1.jpg" alt="patient-img" width="105%" height="295px" class="responsive-img">
      </template>

      <template slot="ul-tabs">
        <ul class="tabs"> 
          <li class="tab col s6"><a href="#pharmacy" class="btn waves-effect waves-light">Pharmacy</a></li>
          <li class="tab col s6"><a  href="#appointment" class="btn waves-effect waves-light">Appointment</a></li>
        </ul>
      </template>

      <template slot="platform-content">
        <div id="pharmacy" class="col s12 w3-card">
        <h5 class="text-center">Have you been prescribed drugst?<br/>
          Kindly search below and place your order.
        </h5>
       <pharmacy/>
        </div>
        <div id="appointment" class="col s12 w3-card">
          <div class="appointment transparent show-content">
            <h5>No appointments yet!</h5>
          </div>
        </div>
      </template>
    </interface>
    <router-view></router-view>
  </div>
</template>

<script>
import Interface from '@/components/layouts/interface'
import Pharmacy from '@/components/features/pharmacy'
import navs from '@/platform/medicalLabScientistInterface/navs'
import BasicDetails from '@/components/widgets/basicDetails'
export default {
  name: 'index',
  components: {Interface, Pharmacy, BasicDetails},
  data () {
    return {
      appointment_icon: navs.links.appointment.icon + ' x2 left',
      updateprofile_icon: navs.links.updateProfile.icon + ' x2 left'
    }
  }
}
</script>

<style>
  i.icon.ion-search.x15 {
  position: absolute;
  top: 0.2rem;
  left: 46rem;
  font-size: 2.2rem;
}
input#autocomplete-input {
  border: 2px solid;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  width: 80%;
  margin: 0rem auto;
}
::placeholder {
  color: #2196f3 !important;
}
#appointment > div > div > div > div > div {
  padding-top: 5rem;
  height: 100vh !important;
}
#appointment .show-content, #pharmacy .show-content{
  height: 100vh;
}
h5{
  text-align: center !important;
}

#pharmacy , #appointment{
  margin-top: 0.08rem;
}

.basic-details {
    margin-top: 1.5rem !important;
}

</style>
