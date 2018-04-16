<template>
  <div class="appointments">
    <div id="mobileBookAppointment" class="modal">
      <div class="modal-content show-on-small-only hide-on-med-and-up">
      <h4 class="blue-text text-center center-align">Book Appointment <span class="right modal-close">x</span></h4> 
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
              Start Time
                <input type="text" class="timepicker startTimeMobile" v-model="formData.setTime.start" @change="viewStart" id="startTimeMobile">
            </div>
            <div class="input-field col s6">
              End Time
              <input type="text" class="timepicker endTimeMobile" v-model="formData.setTime.end" @change="viewEnd" id="endTimeMobile">
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
          <div class="modal-footer">
            <h5 class="white-text"><button type="submit"  class="submit btn-flatrs
             waves-light white-text blue modal-action modal-close" @click="seekAppointment">Submit</button></h5>
          </div>
          
        </form>
      </div>
    </div>
    </div>  
    <interface>
      <template slot="mobile-side-nav-content">
        <div class="msideNav grey-text">
          <div class="mobile basic-det">
            <a href="">Full Name: <span class="white-text name">{{this.$store.state.profile.fullName}}</span></a>
            <a href="">Email: <span class="white-text name">{{this.$store.state.profile.email}}</span></a>
            <li>
            <div class="divider"></div>
          </li>
          </div>
          <li>
            <a href="mobileBookAppointment" class="transparent black-text modal-trigger" v-if="isPatient" data-target="mobileBookAppointment"> <i :class="add_icon"></i>
    Book Appontment</a>
          </li>
        </div>
      </template>
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
                Start Time
                <!-- <datetime v-model="formData.setTime.start"></datetime> -->
                  <!-- <input type="time" class="timepicker" id="startTime" required v-model="formData.setTime.start"><br/> -->
                  <input type="text" class="timepicker startTime" v-model="formData.setTime.start" @change="viewStart" id="startTime">
              </div>
              <div class="input-field col s6">
                End Time
                <!-- <input type="time" class="timepicker" id="endTime" required v-model="formData.setTime.end"><br/> -->
                <input type="text" class="timepicker" v-model="formData.setTime.end" @change="viewEnd" id="endTime">
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

            <h5 class="white-text"><button type="submit"  class="submit btn waves-effect white-text blue" @click="seekAppointment">Submit</button></h5>
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

  <div class="container" style="width: 100%;">
    <div class="row eachAppointment" v-for="(userAppointment, index) in userAppointments" :id="index" :key="userAppointment._id">
          <div class="col s12">
            <div class="card blue-grey white-text">
              <div class="card-content white-text appointmentReason">
                <span class="card-title" v-if="userAppointment.reason">Reason</span>
                <p>{{userAppointment.reason}}</p><br/>
                <div class="dateCreated" v-if="userAppointment.createdAt">
                  <small class="blue btn-small">Date Created</small>
                  <small class="amber-text text-lighten-3">&nbsp;&nbsp;{{formatDate(userAppointment.createdAt)}}</small>
                </div>
              </div>
              <div class="card-action attendingDoc" v-if="userAppointment.doctor && isPatient">
                <a  class="btn waves-effect">
        Attending Doctor</a>
                {{userAppointment.doctor.fullName}}
              </div>
              <div class="card-action attendingDoc" v-if="userAppointment.patient && !isPatient">
                <a  class="btn waves-effect">
        Patient</a>
                {{userAppointment.patient.fullName}}
              </div>
              <div class="card-action attendingDoc" v-if="userAppointment.medlabscientist.laboratoryName && !isLabScientist && userAppointment.medlabscientist.laboratoryScientist">
                <a  class="btn waves-effect">
        Laboratory Name</a>
                {{userAppointment.medlabscientist.laboratoryName}}<br/><br/>
                <a  class="btn waves-effect">
        Laboratory Scientist</a>
                {{userAppointment.medlabscientist.fullName}}
              </div>
            <div class="card-action attendingDoc" v-if="userAppointment.setTime.start !== undefined && userAppointment.setTime.end !== undefined">
              <a  class="btn waves-effect">
        Time:</a>
              {{userAppointment.setTime.start}} - {{userAppointment.setTime.end}}
            </div>
            <div class="card-action attendingDoc" v-if="!isPatient">
                <a  class="btn waves-effect">
        Date:</a>&nbsp;&nbsp;
              <input type="date" class="blue assignAppointmentDate" style="color: #fff !important;
      font-weight: 600; border-radius: 3px; width:50%" @change="selectedDate" :id="userAppointment._id">
            </div>
            <div class="card-action attendingDoc" v-if="userAppointment.setTime.Date !== undefined">
              <a  class="btn waves-effect">
        Appointment Date</a>
              {{formatDateOnly(userAppointment.setTime.Date)}}
            </div>
            <div class="card-action attendingDoc" v-if="userAppointment.status">
              <a  class="btn waves-effect">
        Status</a>
              {{userAppointment.status.statusText}}
              <small class="amber-text text-lighten-3 show-on-small-only">&nbsp;&nbsp;{{formatDate(userAppointment.status.date)}}</small>
              <div class="statusDate right hide-on-small-only">
                <small class="btn-small blue">Date: </small><small class="amber-text text-lighten-3">&nbsp;&nbsp;{{formatDate(userAppointment.status.date)}}</small>
              </div>
              
            </div>
            <div class="card-action attendingDoc" v-if="!isPatient">
              <a  class="btn waves-effect">
        Change Status</a>
              <select class="browser-default waves-effect btn blue accessStatusStyle" style="class: browser" :id="userAppointment._id" @change="toggleAppointmentStatus">
                <option selected disabled>{{userAppointment.status.statusText}}</option>
                <option v-for="(option, index) in options" :value="option.value" :key="index">
              {{ option.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    <div class="noAppointment" v-if="!checkAppointments">
      <h4 class="center">No Appointments yet!</h4>
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
import RequestServices from '@/services/requestServices'
import M from 'materialize-css'
export default {
  components: {Interface, Modal, BasicDetails},
  data () {
    return {
      checkAppointments: '',
      isPatient: false,
      isLabScientist: false,
      choosedDate: '',
      errMsg: '',
      add_icon: navs.links.bookAppointment.icon + ' x2 left',
      formData: {
        reason: '',
        creator: this.$store.state.userType,
        setTime: {
          start: '',
          end: ''
        },
        doctor: this.$store.state.consult.doctorEmail,
        doctorName: this.$store.state.consult.doctorName,
        patient: this.$store.state.profile.email
      },
      userAppointments: null,
      options: [
        {text: 'Pending', value: 'Pending'},
        {text: 'Approved', value: 'Approved'},
        {text: 'Cancelled', value: 'Cancelled'},
        {text: 'Held', value: 'Held'}
      ]
    }
  },
  watch: this.userAppointments,
  async mounted () {
    var elem = document.querySelector('#startTime')
    // eslint-disable-next-line
    var instance = new M.Timepicker(elem, {
      defaultTime: 'now'
    })
    var elem2 = document.querySelector('#endTime')
    // eslint-disable-next-line
    var instance2 = new M.Timepicker(elem2, {
      defaultTime: 'now'
    })

    var elem3 = document.querySelector('#startTimeMobile')
    // eslint-disable-next-line
    var instance3 = new M.Timepicker(elem3, {
      defaultTime: 'now'
    })
    var elem4 = document.querySelector('#endTimeMobile')
    // eslint-disable-next-line
    var instance4 = new M.Timepicker(elem4, {
      defaultTime: 'now'
    })

    // taking care of  mobile book apponitment modal
    var appointmentTrigger = document.querySelector(`#mobileBookAppointment`)
    // eslint-disable-next-line
    var instance = new M.Modal(appointmentTrigger, {})

    if (this.$store.state.userType === 'Patient') {
      this.isPatient = true
    }
    let bookedAppointment = {}
    if (this.$store.state.profile.email) {
      bookedAppointment.userId = this.$store.state.profile.email
    }
    if (this.$store.state.userType === 'Patient') {
      bookedAppointment.user = 'Patient'
    } else if (this.$store.state.userType === 'Doctor') {
      bookedAppointment.user = 'Doctor'
    } else if (this.$store.state.userType === 'MedicalLabScientist') {
      bookedAppointment.user = 'MedicalLabScientist'
      this.isLabScientist = true
    }
    // console.log(bookedAppointment)
    try {
      let userAppointments = (await RequestServices.fetchAppointments(bookedAppointment)).data
      if (userAppointments.length > 0) {
        this.userAppointments = userAppointments
        console.log({appData: this.userAppointments})
        this.checkAppointments = true
      } else {
        this.checkAppointments = false
      }
    } catch (error) {
      if (error) {
        if (error.response.data) {
          console.log(JSON.stringify(error.response.data))
        }
      }
    }
  },
  methods: {
    viewStart (e) {
      this.formData.setTime.start = e.currentTarget.value
      console.log({start: this.formData.setTime.start})
    },
    viewEnd (e) {
      this.formData.setTime.end = e.currentTarget.value
      console.log({end: this.formData.setTime.end})
    },
    selectedDate (e) {
      this.choosedDate = e.currentTarget.value
      this.userAppointments.forEach(appointment => {
        if (appointment._id === e.currentTarget.id) {
          this.setAppointmentDate(e.currentTarget.id, this.choosedDate)
        }
      })
      this.$router.push(`/${this.$store.state.userType.replace(/\s/g, '')}-interface/appointment`)
      // location.href = `/${this.$store.state.userType.replace(/\s/g, '')}-interface/appointment`
    },
    async setAppointmentDate (id, dateVal) {
      try {
        let setAppointmentDate = (await RequestServices.setAppointmentDate({appointment: id, setDate: dateVal})).data
        console.log(setAppointmentDate)
      } catch (error) {
        console.log(error)
        if (error.response.data) {
          console.log(JSON.stringify(error.response.data))
        }
      }
    },
    formatDate (d) {
      return new Date(d).toDateString() + `\t at ` + new Date(d).toLocaleTimeString()
    },
    formatDateOnly (d) {
      return new Date(d).toDateString()
    },
    toggleAppointmentStatus (e) {
      this.userAppointments.forEach((eachAppointment) => {
        if (eachAppointment._id === e.target.id) {
          this.updateAppointment(eachAppointment._id, e.currentTarget.value)
        }
      })
      this.$router.push(`/${this.$store.state.userType.replace(/\s/g, '')}-interface/appointment`)
      // location.href = `/${this.$store.state.userType.replace(/\s/g, '')}-interface/appointment`
    },
    validateForm (e) {},
    async updateAppointment (identifier, data) {
      try {
        let updatedAppointment = (await RequestServices.updateAppointment({appointment: identifier, setStatus: data})).data
        console.log(updatedAppointment)
      } catch (error) {
        if (error) {
          console.log(error)
          console.log(JSON.stringify(error.response.data))
        }
      }
    },
    async seekAppointment () {
      let appointmentData = {}
      if (this.formData.reason && this.formData.reason.length >= 8) {
        appointmentData.reason = this.formData.reason
      } else {
        alert('Invalid input. Please enter a valid reason')
        return
      }
      // this.formData.setTime.start = this.verifyMeridian(this.formData.setTime.start)
      // this.formData.setTime.end = this.verifyMeridian(this.formData.setTime.end)
      appointmentData.creator = this.formData.creator
      appointmentData.patient = this.formData.patient
      if ((this.formData.setTime.start) || (this.formData.setTime.end <= 12)) {
        appointmentData.setTime = {
          start: this.formData.setTime.start,
          end: this.formData.setTime.end
        }
      } else {
        alert('Enter valid start and end time!')
        return
      }
      if (this.formData.doctor) {
        appointmentData.doctor = this.formData.doctor
      } else {
        alert('You are yet to consult a doctor!')
        document.getElementById('id01').style.display = 'none'
        return
      }
      try {
        // console.log(appointmentData)
        const bookAppointment = await (RequestServices.seekAppointment(appointmentData))
        console.log({'appointmentData': bookAppointment.data})
        document.getElementById('id01').style.display = 'none'
        this.formData.reason = ''
        this.formData.setTime.start = ''
        this.formData.setTime.end = ''
        alert(`You have successfully book appointment with ${this.formData.doctorName}`)
        this.$router.push(`/${this.$store.state.userType.replace(/\s/g, '')}-interface/appointment`)
        // location.href = `/${this.$store.state.userType.replace(/\s/g, '')}-interface/appointment`
      } catch (error) {
        if (error) {
          alert(error.response.data)
          console.log(JSON.stringify(error, null, 2))
        }
      }
    }
  }
}
</script>

<style scoped>
#id01 > div > div > div > div > form {
  padding: 0 2.5rem;
}
#modal-c3f1d8d3-341c-25dc-df52-ee366e699d50 > div > div.timepicker-digital-display, #modal-f53efcaa-727f-1a3a-d72b-bd2d84f54343 > div > div.datepicker-date-display {
  background-color: #2196f3 !important;
}
#app > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div.platform-content > div > div > div:nth-child(1) > div:nth-child(5) > form > div > div > input {
  margin-left: -0.8rem;
  text-align: left;
  padding-left: 2rem;
  color: #fff !important;
}
#app > div > div > div > div > div > div > div.platform-content > div > div > div  a {
  z-index: 0;
}
div.appointments div > div > div > div {
  margin-top: 0.6%;
}
#app > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div.platform-content > div > div > div > div:nth-child(7) {
  margin-top: -1.4rem;
}
#appointmentStatus > option {
    color: #2196f3;
    background-color: #fff;
}
div .accessStatusStyle {
  width: auto;
    margin-top: -2rem;
    margin-left: 14rem;
}
div .restrictStatusStyle {
  margin-top: -3.0rem;
  margin-left: 9rem;
}
#app > div > div > div.main-interface > div:nth-child(3), div.main-interface #majorContent {
  margin-left: 25% !important;
}
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
    -webkit-box-shadow: 0 0px 0px 0 rgba(0,0,0,0), 0 0px 0px 0px rgba(0,0,0,0), 0 0px 0px 0 rgba(0,0,0,0);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0), 0 0px 0px 0 rgba(0,0,0,0);
}
#app > div > div > div > div > div > div > div.platform-content > div > div > div > div.card-action {
  margin-top: 0%;
}
#app > div > div > div > div > div > div > div.platform-content > div > div > div > div.card-action > div {
  margin-top: -1.2%;
}
#app > div > div > div > div > div > div > div.platform-content > div > div > div > div.row > div > div > div > div {
  margin-top: 1%;
  margin-left: -2%;
}
#app > div > div > div > div > div > div > div.platform-content > div > div > div > div.row > div > div > div > div > label.active {
    color: #fff;
    font-weight: 600;
    margin-top: -1rem;
}
div.apointments #chooseDate {
  color: #fff !important;
  font-weight: 600;
}
</style>
