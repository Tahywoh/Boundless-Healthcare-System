<template>
<div class="patient-dashboard">
<interface>  
  <template slot="consult-doctor">
    <div class="row consult-doctor left hide-on-med-and-down">
      <form  class="search-doctor" @submit="findDoctors" @submit.prevent="validateForm">
        <div class="input-field col s12">
      <!-- <i class="icon ion-search x15"></i> -->
          <input type="search" id="autocomplete-input" class="autocomplete" placeholder="Consult a doctor now!" v-model="search" />
          <i class="icon ion-search x15" @click="findDoctors"></i>
        </div>
      </form>
    </div>

    
  </template>
  <template slot="fixed-nav-bar">
         <li><a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
          <li><a  id="profile" class="btn transparent white-text waves-effect waves-light">
          Profile
          </a></li>
          <li><router-link to="/patient-interface/appointment" class="btn transparent white-text waves-effect waves-light">Appointment
          </router-link>
          </li>
          <li><a class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit(topLinks.doLogOut)">
          Logout
          </a></li>
      </template>
  <template slot="basic-details">
     <a href="#" class="w3-bar-item w3-button"><h6>Full Name:</h6>  <br/><h6 class="name"> Adeshina Taiwo A.</h6></a>
      <a href="#" class="w3-bar-item w3-button"><h6>Email Address:</h6><br/>
      <h6 class="email">a.taiwoquadri@gmail.com</h6> </a>
  </template>

  <template slot="side-nav-content">
    <div class="divider"></div>
    <a href="#" class="w3-bar-item w3-button">
      <i :class="medicalrecord_icon"></i>
      Medical record
    </a>
    <div class="divider"></div>
    <a href="#" class="w3-bar-item w3-button">
      <i :class="message_icon"></i>  
      Messages 
      <span class="circle blue notification-circle">2</span>
    </a>
    <div class="divider"></div>
    <a href="#" class="w3-bar-item w3-button">
      <i :class="cart_icon"></i>
      Cart 
      <span class="circle blue notification-circle">4</span>
    </a>
    <div class="divider"></div>
   
    <a href="#" class="w3-bar-item w3-button">
       <i :class="updateprofile_icon"></i>
      Update Profile
    </a>
  </template>

  <template slot="user-type-img">
     <img src="../../assets/platform/aditya-romansa-117344new.jpg" alt="patient-img" width="105%" height="295px" class="responsive-img">
  </template>
   <template slot="ul-tabs">
    <ul class="tabs"> 
        <li class="tab col s4"><a href="#pharmacy" class="btn waves-effect waves-light">Pharmacy</a></li>
        <li class="tab col s4"><a  href="#messages_conv" class="btn waves-effect waves-light">Messages</a></li>
        <li class="tab col s4"><a  href="#medicalLab" class="btn waves-effect waves-light">Medical lab</a></li>
      </ul>
  </template>

  <template slot="platform-content">
    <div id="pharmacy" class="col s12 w3-card">
      <h5 class="text-center">Have you been prescribed drugs?<br/>
        Kindly search below and place your order.
      </h5>
      <pharmacy/>
    </div>
    <div id="messages_conv" class="col s12 w3-card">
      <div class="messages transparent show-content">
        <h5>No conversations yet</h5>
        <messages/>
      </div>
    </div>
    <div id="medicalLab" class="col s12 w3-card">
      <div class="medical-lab show-content transparent">
        <h5 class="text-center">App in development, <br/>
        Please check back later!
        </h5>
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
import SearchService from '@/services/searchService'
import Pharmacy from '@/components/features/pharmacy'
import navs from '@/platform/patientInterface/navs'

export default {
  components: {Interface, messages, Pharmacy},
  name: 'index',
  data () {
    return {
      medicalrecord_icon: navs.links.medicalRecord.icon + ' x2 left',
      message_icon: navs.links.messages.icon + ' x2 left',
      cart_icon: navs.links.cart.icon + ' x2 left',
      updateprofile_icon: navs.links.updateProfile.icon + ' x2 left',
      search: '',
      topLinks: {
        doLogOut: 'do-logout',
        goToProfile: 'go-to-profile'
      }
    }
  },
  methods: {
    validateForm (e) {},
    async findDoctors () {
      let validSearchInput = {}
      if (this.search !== '') {
        validSearchInput.search = this.search.toLowerCase()
      } else {
        console.log('Please enter a valid inout!')
        return false
      }
      console.log(validSearchInput)
      try {
        const response = await SearchService.findDoctors({query: validSearchInput.search})
        let responseData = response.data
        console.log(responseData)
      } catch (error) {
        if (error) {
          console.log(JSON.stringify(error.response.data))
        }
      }
    }
  }
}
</script>
<style scoped>
/* styling search doctor bar */
form.search-doctor ::placeholder {
  color: #fff !important;
  font-size: 1.2rem;
}
input:focus::-webkit-input-placeholder {
  color: #2196f3 !important;
  font-size: 0.8rem;
}
/* styling the consult doctor search bar */

form.search-doctor #autocomplete-input {
    border: 2px groove #fff !important;
    width: 100%;
}
form.search-doctor i.icon.ion-search.x15 {
    left: 17rem;
    font-weight: 100 !important;
    font-size: 1.89rem;
    top: -1.1rem;
}
form.search-doctor .input-field.col.s12 {
    margin-top: 1.2rem;
    margin-left: 1.3rem;
}

form.search-doctor ::placeholder {
  color: #fff !important;
  font-size: 1.2rem;
}
input:focus::-webkit-input-placeholder {
  color: #2196f3 !important;
  font-size: 0.8rem;
}
/* styling the consult doctor search bar */

form.search-doctor #autocomplete-input {
    border: 2px groove #fff !important;
    width: 100%;
}
form.search-doctor i.icon.ion-search.x15 {
    left: 17rem;
    font-weight: 100 !important;
    font-size: 1.89rem;
    top: -1.1rem;
}
form.search-doctor .input-field.col.s12 {
    margin-top: 1.2rem;
    margin-left: 1.3rem;
}

#pharmacy,
#messages_conv,
#medicalLab {
  margin-top: 0.08rem;
}
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
#pharmacy > div > div > div > div > div {
  padding-top: 0rem;
  height: 100vh !important;
}
#messages_conv .show-content,
#medicalLab .show-content {
  height: 100vh;
}
h5{
  text-align: center !important;
}
.basic-details {
    margin-top: 0.5rem !important;
}
div.side-nav-content {
    padding-top: 0rem !important;
}
</style>
 