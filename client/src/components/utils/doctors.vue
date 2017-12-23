<template>
  <div class="doctors">
   <interface>
     <template slot="basic-details">
     <a href="#" class="w3-bar-item w3-button"><h6>Full Name:</h6>  <br/><h6 class="name"> Adeshina Taiwo A.</h6></a>
      <a href="#" class="w3-bar-item w3-button"><h6>Email Address:</h6>  <br>
      <h6 class="email">a.taiwoquadri@gmail.com</h6> </a>
  </template>

  <template slot="user-type-img">
     <img src="../../assets/platform/aditya-romansa-117344new.jpg" alt="patient-img" width="105%" height="295px" class="responsive-img">
  </template>

  <template slot="platform-content" class="container">
    <div class="fetchDoctors w3-container container">
      <h4 class="text-center center-align">Doctors</h4>
    <h5 class="text-center">No registered doctor(s) yet!</h5>
    <div v-for="doctor in doctors" :key="doctor.id" class="blue-grey white-text eachDoctor">
      <!-- <p>{{doctor.fullName}}</p> -->

       <a href="" class="btn waves-effect-waves-light">Full Name: <span>{{doctor.fullName}}</span></a>
       <a href="" class="btn waves-effect-waves-light">City: <span>{{doctor.city}}</span></a>
      <a href="" class="btn waves-effect-waves-light">
      State: <span>{{doctor.state}}</span>
    </a>
    </div>
    </div>
    
  </template>
</interface>
   
<router-view></router-view>
  </div>
</template>
<script>
import Interface from '@/components/layouts/interface'
import doctorService from '@/services/doctorService'
export default {
  components: {Interface},
  name: 'doctors',
  data () {
    return {
      doctors: {
        fullName: '',
        city: '',
        state: '',
        id: ''
      }
    }
  },
  async mounted () {
    // do a request to the backend
    this.doctors = await doctorService.getDoctors()
  }
}
</script>

<style scoped>
div > div > div.header-view > nav > div > div > form{
  display: none;
}
.eachDoctor {
  padding: 0.2rem 0.34rem;
    margin-top: 0.3rem;
}
</style>
