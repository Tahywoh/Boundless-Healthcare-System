<template>
  <div class="appointments">
   <interface>
     <template slot="basic-details">
     <a href="#" class="w3-bar-item w3-button"><h6>Full Name:</h6>  <br/><h6 class="name"> Adeshina Taiwo A.</h6></a>
      <a href="#" class="w3-bar-item w3-button"><h6>Email Address:</h6>  <br>
      <h6 class="email">a.taiwoquadri@gmail.com</h6> </a>
  </template>

  <template slot="user-type-img">
     <img src="../../assets/platform/aditya-romansa-117344new.jpg" alt="patient-img" width="105%" height="295px" class="responsive-img">
  </template>

  <template slot="platform-content">
     <div class="w3-card-8">

<header class="w3-container w3-blue center-align">
  <h4>Appointments</h4>
</header>

<div class="w3-container container">
  <!-- <p>Lorem ipsum...</p>
  <button class="w3-btn">Button</button> -->
  <div class="eachAppointment blue-grey white-text">
    <p>I am sick</p>
    <a href="" class="btn waves-effect-waves-light">status: <span>Approved</span></a>
    <a href="" class="btn waves-effect-waves-light">
      Time: <span>10:00 - 12: 00</span>
    </a>
  </div>
  <div class="eachAppointment blue-grey white-text">
    <p>I am sick</p>
    <a href="" class="btn waves-effect-waves-light">status: <span>Approved</span></a>
    <a href="" class="btn waves-effect-waves-light">
      Time: <span>10:00 - 12: 00</span>
    </a>
  </div>
  <div class="eachAppointment blue-grey white-text">
    <p>I am sick</p>
    <a href="" class="btn waves-effect-waves-light">status: <span>Canceled</span></a>
    <a href="" class="btn waves-effect-waves-light">
      Time: <span>10:00 - 12: 00</span>
    </a>
  </div>
  <div class="eachAppointment blue-grey white-text">
    <p>I am sick</p>
    <a href="" class="btn waves-effect-waves-light">status: <span>Approved</span></a>
    <a href="" class="btn waves-effect-waves-light">
      Time: <span>10:00 - 12: 00</span>
    </a>
  </div>
  <div class="eachAppointment blue-grey white-text">
    <p>I am sick</p>
    <a href="" class="btn waves-effect-waves-light">status: <span>Pending</span></a>
    <a href="" class="btn waves-effect-waves-light">
      Time: <span>10:00 - 12: 00</span>
    </a>
  </div>
<!-- <bookAppointment> -->
  <!-- <template slot="appointmentTrigger">
    <span><a class="btn bookAppointment">Book one!</a></span>
  </template> -->

<!-- </bookAppointment> -->
<modal>
  <div slot="triggerModal">Book Appointment</div>
  <template slot="modal-title">Book Appointment</template>
  <template slot="modal-content">
      <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
          <textarea id="reason" class="materialize-textarea"></textarea>
          <label for="reason">Reason</label>
        </div>
        </div>
         <div class="row">
          <div class="input-field col s6">
            <input id="doctor" type="text" data-length="10">
            <label for="doctor">Doctor</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
              <input type="text" class="timepicker" id="startTime">
            <label for="startTime">Start</label>
          </div>
          <div class="input-field col s6">
             <input type="text" class="timepicker" id="endTime">
            <label for="endTime">End</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
              <input type="text" class="datepicker" id="date">
            <label for="date">Date</label>
          </div>
         
  <h5 class="white-text"><a href="" class="submit btn waves-effect waves-light white-text blue">Submit</a></h5>

        </div>
       
       
        
      </form>
    </div>
    </template>
</modal>
  
</div>


</div>
  </template>
   </interface>
   
<router-view></router-view>
  </div>
</template>
<script>
import Interface from '@/components/layouts/interface'
// import BookAppointment from '@/components/features/bookappointment'
import Modal from '@/components/snippets/modal'
export default {
  components: {Interface, Modal}
}
</script>

<style>
div.appointments input {
    margin: 0 0 -20px 0 !important;
}
.eachAppointment.blue-grey.white-text {
    padding: 0.2rem 0.34rem;
    margin-top: 0.3rem;
}

#id01 > div > div > p > div > form > div > div {
    margin-top: 0 !important;
}
div > div > div.header-view > nav > div > div > form{
  display: none;
}
#app > div > div > div > div > div > div.platform-content > div > div > div > a {
    margin-top: 1.3rem;
    padding: 0.2rem 0.5rem;
    webkit-box-shadow: 0 0px 0px 0 rgba(0,0,0,0), 0 0px 0px 0px rgba(0,0,0,0), 0 0px 0px 0 rgba(0,0,0,0);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0), 0 0px 0px 0 rgba(0,0,0,0);
}
</style>
