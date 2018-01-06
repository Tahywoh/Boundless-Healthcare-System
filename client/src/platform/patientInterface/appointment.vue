<template>
  <div class="appointments">
   <interface>
    <template slot="basic-details">
     <basicDetails/>
    </template>
  <template slot="side-nav-content">
    <div class="divider"></div>
<modal>
  <div slot="triggerModal">
   <a href="#" class="transparent black-text"> <i :class="add_icon"></i>
  Book Appontment</a>
  </div>    
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
    <div class="divider"></div>
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
  <div class="eachAppointment blue-grey white-text" v-for="(appointment, index) in appointments" :key="index">
    <p v-html="appointment.body">I am sick</p>
    <a href="" class="right btn waves-effect waves-light">
      Attending Doctor:
  	  <span id="attendingDoctor">{{appointment.attendingDoctor}}</span>
    </a>
    <a href="" class="btn waves-effect-waves-light">status: <span v-text="appointment.status">Approved</span></a>
    <a href="" class="btn waves-effect-waves-light">
      Time: <span v-text="appointment.time">10:00 - 12: 00</span>
    </a>
  </div>
</div>


</div>
  </template>
  </interface>
   
<router-view></router-view>
  </div>
</template>
<script>
import Interface from '@/components/layouts/interface'
import navs from '@/platform/patientInterface/navs'
import Modal from '@/components/snippets/modal'
import BasicDetails from '@/components/widgets/basicDetails'
export default {
  components: {Interface, Modal, BasicDetails},
  data () {
    return {
      add_icon: navs.links.bookAppointment.icon + ' x2 left',
      appointments: [
        {
          body: 'I am sick',
          status: 'approved',
          time: '10:00am - 12:00pm',
          attendingDoctor: 'Dr. Sodiq'
        },
        {
          body: 'I am feeling pain',
          status: 'approved',
          time: '10:00am - 12:00pm',
          attendingDoctor: 'Dr. Mrs. Hikma'
        },
        {
          body: 'I am sick',
          status: 'canceled',
          time: '10:00am - 12:00pm',
          attendingDoctor: 'Dr. Kehinde'
        },
        {
          body: 'I have a continous headache',
          status: 'approved',
          time: '10:00am - 12:00pm',
          attendingDoctor: 'Dr. Adewale'
        },
        {
          body: 'I have a continous headache',
          status: 'held',
          time: '10:00am - 12:00pm',
          attendingDoctor: 'Dr. Taiwo'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* styling the appointment section */
#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div.platform-content > div > div > div > a.right.btn.waves-effect.waves-light {
    font-size: 0.7rem;
    padding: 0.1rem 0.5rem;
    margin-top: -2rem;
}
div#newmodal :focus {
    background-color: transparent !important;
}
#id01 > div > div > p > div > form > div:nth-child(4) > h5 > a {
    line-height: 21px;
    padding: 0.5rem 1rem;
}
#id01 > div > div{
  height: 61.7vh !important;
}
#id01 > div {
    width: 45% !important;
    height: 73vh !important;
}
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
