<template>
<div class="doctor-dashboard">
  <interface>
    <template slot="basic-details">
      <basicDetails/>
    </template>
    <template slot="side-nav-content">
      <div class="divider"></div>
      <a href="#" class="w3-bar-item w3-button">
        <i :class="patient_icon"></i>  
        Patients 
        <span class="circle blue notification-circle">5</span>
      </a>
      <div class="divider"></div>
      <!-- <a href="#" class="w3-bar-item w3-button">
        <i :class="message_icon"></i>  
        Messsages
        <span class="circle blue notification-circle">3</span>
      </a> -->
      <div class="divider"></div>
        <router-link class="w3-bar-item w3-button" :to="updateProfile">
          <i :class="updateprofile_icon"></i>
          Update Profile
        </router-link>
    </template>
     
    <template slot="user-type-img">
       <img src="../../assets/platform/doctor-interface.jpg" alt="patient-img" width="105%" height="295px" class="responsive-img">
    </template>

    <template slot="ul-tabs">
      <ul class="tabs"> 
        <li class="tab col s6"><a href="#pharmacy" class="btn waves-effect waves-light">Pharmacy</a></li>
        <li class="tab col s6"><a  href="#messages" class="btn waves-effect waves-light">Messages</a></li>
      </ul>
    </template>
      
    <template slot="platform-content">
      <div id="pharmacy" class="col s12 w3-card">
      <h5 class="text-center">Have you been prescribed drugs?<br/>
        Kindly search below and place your order.
      </h5>
      <pharmacy/>
    </div>
    <div id="messages" class="col s12 w3-card">
      <div class="messages transparent show-content">
        <!-- <h5>No conversations yet</h5> -->
        <messages/>
      </div>
    </div>
    </template>
  </interface>
  <router-view></router-view>
</div>
</template>

<script>
import Interface from '@/components/layouts/interface'
import messages from '@/components/features/messages'
import Pharmacy from '@/components/features/pharmacy'
import navs from '@/platform/doctorInterface/navs'
import BasicDetails from '@/components/widgets/basicDetails'
import M from 'materialize-css'
export default{
  components: {Interface, messages, Pharmacy, BasicDetails},
  name: 'index',
  data () {
    return {
      patient_icon: navs.links.patient.icon + ' x2 left',
      message_icon: navs.links.message.icon + ' x2 left',
      updateprofile_icon: navs.links.updateProfile.icon + ' x2 left',
      updateProfile: navs.links.updateProfile.url
    }
  },
  mounted () {
    var el = document.querySelector('ul.tabs')
    // eslint-disable-next-line
    var instance = M.Tabs.init(el, {})
  }
}
</script>
<style>
#app > div > div > div.header-view > nav > div > div, #app > div > div > div.header-view > nav > div > div > form > div{
  display: none !important;
}
i.icon.ion-search.x15 {
    position: absolute;
    top: 0.2rem;
    left: 92%;
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
#pharmacy > div > div > div > div > div {
  padding-top: 0rem;
  /* height: 100vh !important; */
}
#messages .show-content{
  height: 100vh;
}
h5{
  text-align: center !important;
}

#pharmacy, #messages{
  margin-top: 0.08rem;
}

.basic-details {
    margin-top: 1.5rem !important;
}
</style>
