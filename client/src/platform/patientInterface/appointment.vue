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
      <form class="col s12" @submit.prevent="validateForm">
        <div class="row">
          <div class="input-field col s12">
          <textarea id="reason" class="materialize-textarea" v-model="formData.reason" required></textarea>
          <label for="reason">Reason</label>
        </div>
        </div>
         <div class="row">
          <div class="input-field col s6">
            <input id="doctor" type="text" data-length="10" required v-model="formData.to.fullName">
            <label for="doctor">Doctor</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
              <input type="text" class="timepicker" id="startTime" required v-model="formData.setTime.start" placeholder="9:00 am">
            <label for="startTime">Start</label>
          </div>
          <div class="input-field col s6">
             <input type="text" class="timepicker" id="endTime" required v-model="formData.setTime.end"  placeholder="1:00 pm">
            <label for="endTime">End</label>
          </div>
        </div>

        <div class="row">
          <small class="red-text left">
            <b>Note:</b>&nbsp;The doctor is meant to specify date along with either the appointment is pending, accepted or canceled. And if the date is not feasible for him/her, he can always change it as well.
          </small>
        </div>
        <div class="row text-center">
          <small class="errMsg red-text text-center" >
            {{errMsg}}
          </small>
        </div>

         <h5 class="white-text"><button type="submit" href="" class="submit btn waves-effect waves-light white-text blue" @click="seekAppointment()">Submit</button></h5>
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
// import $ from 'jquery'
import RequestServices from '@/services/requestServices'
export default {
  components: {Interface, Modal, BasicDetails},
  data () {
    return {
      errMsg: '',
      add_icon: navs.links.bookAppointment.icon + ' x2 left',
      formData: {
        reason: '',
        creator: this.$store.state.profile.email,
        setTime: {
          start: '',
          end: ''
        },
        doctor: 'New testing doctor'
      },
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
  },
  methods: {
    validateForm (e) {},
    async seekAppointment () {
      let appointmentData = {}
      appointmentData.creator = {
        userType: this.formData.creator.userType,
        fullName: this.formData.creator.fullName
      }
      appointmentData.setTime = {
        start: this.formData.setTime.start,
        end: this.formData.setTime.end
      }
      appointmentData.to = {
        userType: this.formData.to.userType,
        fullName: this.formData.to.fullName
      }
      if (this.formData.reason) {
        appointmentData.reason = this.formData.reason
      } else {
        this.errMsg = 'Invalid input. Pls enter a valid input'
        // return false
      }
      try {
        console.log(appointmentData)
        const bookAppointment = await (RequestServices.seekAppointment(appointmentData))
        console.log({'appointmentData': bookAppointment.data})
        alert('success')
      } catch (error) {
        if (error) {
          this.errMsg = error.bookAppointment.data
          console.log(JSON.stringify(this.errMsg, null, 2))
        }
      }
    }
  },
  mounted () {
    console.log({'creator': `${this.formData.creator.userType}`})
    // $('#timepicker').pickatime({
    //   default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    //   fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    //   twelvehour: false, // Use AM/PM or 24-hour format
    //   donetext: 'OK', // text for done-button
    //   cleartext: 'Clear', // text for clear-button
    //   canceltext: 'Cancel', // Text for cancel-button
    //   autoclose: false, // automatic close timepicker
    //   ampmclickable: true, // make AM PM clickable
    //   aftershow: function () {} // Function for after opening timepicker
    // })
  }
}
</script>

<style scoped>
#id01 > div > div > div > div > form > div:nth-child(4) > h5 > button {
  margin: 2rem 4rem 0rem;
}
/* styling the appointment section */
#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div.platform-content > div > div > div > a.right.btn.waves-effect.waves-light {
    font-size: 0.7rem;
    padding: 0.1rem 0.5rem;
    margin-top: -2rem;
    z-index: auto;
}
div#newmodal :focus {
    background-color: transparent;
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
