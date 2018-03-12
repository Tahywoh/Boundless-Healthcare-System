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
   <a href="#" class="transparent black-text" v-if="isPatient"> <i :class="add_icon"></i>
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
            Doctor Name
            <input id="doctor" type="text" data-length="10" required v-model="formData.doctorName" disabled>
          </div>
          <div class="input-field col s6">
            Doctor Email
            <input id="doctor" type="text" data-length="10" required disabled v-model="formData.doctor">
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            Start
            <datetime v-model="formData.setTime.start"></datetime>
              <!-- <input type="time" class="timepicker" id="startTime" required v-model="formData.setTime.start" > -->
            <!-- <label for="startTime">Start</label> -->
          </div>
          <div class="input-field col s6">
            End
             <!-- <input type="time" class="timepicker" id="endTime" required v-model="formData.setTime.end"  placeholder="1:00 pm"> -->
             <datetime v-model="formData.setTime.end"></datetime>
            <!-- <label for="endTime">End</label> -->
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
   <!-- <div class="eachAppointment blue-grey white-text" v-for="(appointment, index) in appointments" :key="index">
    <p v-html="appointment.body">I am sick</p>
    <a href="" class="right btn waves-effect waves-light">
      Attending Doctor:
  	  <span id="attendingDoctor">{{appointment.attendingDoctor}}</span>
    </a>
    <a href="" class="btn waves-effect-waves-light">status: <span v-text="appointment.status">Approved</span></a>
    <a href="" class="btn waves-effect-waves-light">
      Time: <span v-text="appointment.time">10:00 - 12: 00</span>
    </a>
  </div> -->
  <div class="eachAppointment blue-grey white-text" v-for="(userAppointment, index) in userAppointments" :key="index">
    <p v-text="userAppointment.reason">I am sick
    </p>

    <p class="atending_doc" v-if="userAppointment.doctor">
      <a href="" class="btn waves-effect waves-light">
      Attending Doctor:
  	  <span id="attendingDoctor">{{userAppointment.doctor.fullName}}</span>
      </a>  
    </p>
    <p class="atending_patient" v-if="userAppointment.patient">
      <a href="" class="btn waves-effect waves-light">
      Patient:
  	  <span id="attendingPatient">{{userAppointment.patient.fullName}}</span>
      </a>  
    </p>
    <div class="labUser" v-if="userAppointment.medlabscientist">
      <p class="labName">
      <a href="" class="btn waves-effect waves-light">
      Laboratory Name:
  	  <span id="labname">{{userAppointment.laboratoryName}}</span>
      </a>
      </p>
      <p>
        <a href="" class="btn waves-effect waves-light">
        Laboratory Address:
        <span id="labaddr">{{userAppointment.laboratoryAddress}}</span>
        </a>  
      </p>
    </div>
     <p>
    <a href="" class="btn waves-effect-waves-light">
      Time: <span v-html="userAppointment.setTime.start"></span> - <span v-html="userAppointment.setTime.end"></span>
    </a>
    </p>
    <p class="combine">
        <span class="btn waves-effect-waves-light blue">
        status:
        </span>
        <select class="browser-default waves-effect waves-light btn blue" style="class: browser" id="appointmentStatus" v-if="!isPatient">
          <option selected disabled>{{userAppointment.status.statusText}}</option>
          <option v-for="(option, index) in options" :value="option.value" :key="index">
            {{ option.text }}
          </option>
        </select>
        <div class="notPatient">
          <a class="btn waves-light waves-effect">
            {{userAppointment.status.statusText}}
          </a>
        </div>
      
      <!-- <a href="" class="right btn waves-effect waves-light">Default: <span v-text="userAppointment.status.statusText"></span></a> -->
    </p>
    
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
import datetime from 'vuejs-datetimepicker'
export default {
  components: {Interface, Modal, BasicDetails, datetime},
  data () {
    return {
      isPatient: false,
      errMsg: '',
      add_icon: navs.links.bookAppointment.icon + ' x2 left',
      formData: {
        reason: 'hi',
        creator: this.$store.state.userType,
        setTime: {
          start: '',
          end: ''
        },
        doctor: this.$store.state.consult.doctorEmail,
        doctorName: this.$store.state.consult.doctorName,
        patient: this.$store.state.profile.user
      },
      userAppointments: null,
      options: [
        {text: 'Approved', value: 'Approved'},
        {text: 'Cancelled', value: 'Cancelled'},
        {text: 'Held', value: 'Held'}
      ]
    }
  },
  async mounted () {
    if (this.$store.state.userType === 'Patient') {
      this.isPatient = true
    }
    let bookedAppointment = {}
    if (this.$store.state.profile.user) {
      bookedAppointment.userId = this.$store.state.profile.user
    }
    if (this.$store.state.userType === 'Patient') {
      bookedAppointment.user = 'Patient'
    } else if (this.$store.state.userType === 'Doctor') {
      bookedAppointment.user = 'Doctor'
      return false
    } else if (this.$store.state.userType === 'MedicalLabScientist') {
      bookedAppointment.user = 'MedicalLabScientist'
    }
    // console.log(bookedAppointment)
    try {
      let userAppointments = (await RequestServices.fetchAppointments(bookedAppointment)).data
      if (userAppointments.length > 0) {
        this.userAppointments = userAppointments
        console.log({testinguAP: this.userAppointments})
        for (let i = 0; i < this.userAppointments.length; i++) {
          console.log({testfield: this.userAppointments[i].setTime.start})
        }
      }
    } catch (error) {
      if (Error) {
        console.log(JSON.stringify(error.userAppointments))
      }
    }
  },
  methods: {
    okay (e) {
      // e = 'It is working!'
      console.log(e)
    },
    validateForm (e) {},
    async seekAppointment () {
      let appointmentData = {}
      appointmentData.creator = this.formData.creator
      appointmentData.patient = this.formData.patient
      if (this.formData.setTime.start && this.formData.setTime.end) {
        appointmentData.setTime = {
          start: this.formData.setTime.start,
          end: this.formData.setTime.end
        }
      } else {
        alert('Enter valid start and end time!')
        return false
      }
      if (this.formData.doctor) {
        appointmentData.doctor = this.formData.doctor
      } else {
        alert('You are yet to consult a doctor!')
        return false
      }
      if (this.formData.reason) {
        appointmentData.reason = this.formData.reason
      } else {
        alert('Invalid input. Please enter a valid input')
        return false
      }
      try {
        console.log(appointmentData)
        const bookAppointment = await (RequestServices.seekAppointment(appointmentData))
        console.log({'appointmentData': bookAppointment.data})
        this.formData.reason = ''
        this.formData.setTime.start = ''
        this.formData.setTime.end = ''
      } catch (error) {
        if (error) {
          alert(error.bookAppointment.data)
          console.log(JSON.stringify(error.bookAppointment.data, null, 2))
        }
      }
    }
  }
}
</script>

<style scoped>
#app > div > div > div > div > div > div > div.platform-content > div > div > div > p.combine > a {
  margin-top: -2.1rem;
}
#app > div > div > div > div > div > div > div.platform-content > div > div > div > p.combine > select[data-v-3bcfc470] {
    width: auto;
    margin-top: -2.15rem;
    margin-left: 9rem;
}
#app > div > div > div > div > div > div > div.platform-content > div > div > div > p.atending_doc > a {
  text-align: left;
}
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
