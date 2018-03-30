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
          <!-- <autocomplete  anchor="title" label="writer" :on-select="getData(testData)"> -->
          <!-- </autocomplete> -->
        </div>
        <!-- <small class="searchErr red-text">{{searchErr}}</small> -->
      </form>
    </div>

    
  </template>
  <template slot="fixed-nav-bar">
     <li><a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
    <li><router-link id="profile" class="btn transparent white-text waves-effect waves-light" :to="topLinks.goToProfile">
    Profile
    </router-link></li>
    <li><router-link :to="topLinks.toAppointment" class="btn transparent white-text waves-effect waves-light">Appointment
    </router-link>
    </li>
    <li><a class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit(topLinks.doLogOut)">
    Logout
    </a></li>
    </template>
  <template slot="basic-details">
    <basicDetails/>
  </template>

  <template slot="side-nav-content">
    <sidenav/>
  </template>

  <template slot="user-type-img">
     <img src="../../assets/platform/aditya-romansa-117344new.jpg" alt="patient-img" width="105%" height="295px" class="responsive-img">
  </template>
   <template slot="ul-tabs" id="ul-tabs">
    <ul class="tabs"> 
        <li class="tab col s4"><a href="#pharmacy" class="btn waves-effect waves-light">Pharmacy</a></li>
        <li class="tab col s4"><a  href="#messages_conv" class="btn waves-effect waves-light">Messages</a></li>
        <li class="tab col s4"><a  href="#medicalLab" class="btn waves-effect waves-light">Medical lab</a></li>
      </ul>
  </template>
  <div slot="platform-content" id="docSearch">
    <div class="doctorSearchResult">
      <div class="fetchDoctors w3-container">
        <h4 class="text-center center-align blue darken-2 white-text z-depth-2">Doctors</h4>
        <div class="text-center center-align" v-if="!registeredDoctors">
          <h5>{{docStatus}}</h5> 
        </div>
        <div v-else v-for="(doctor, index) in doctors" :id="index" :key="doctor._id" class="blue-grey white-text eachDoctor">
          <a class="btn waves-effect-waves-light" @click="viewDoc(doctor._id)">{{doctor.fullName}}</a><br/>
          <a class="right btn waves-effect waves-light consultBtn" @click="createChannel(doctor._id)" :id="index" :key="doctor._id">consult</a>
          <a href="" class="btn waves-effect-waves-light" >City: <span>{{doctor.city}}</span></a>
          <a href="" class="btn waves-effect-waves-light">
          State: <span>{{doctor.state}}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  <template slot="platform-content" id="platform-content">
    <div id="pharmacy" class="col s12 w3-card">
      <h5 class="text-center">Have you been prescribed drugs?<br/>
        Kindly search below and place your order.
      </h5>
      <pharmacy/>
    </div>
    <div id="messages_conv" class="col s12 w3-card">
      <div class="messages transparent show-content">
        <messages/>
      </div>
    </div>
    <div id="medicalLab" class="col s12 w3-card">
      <div class="medical-lab show-content transparent">
        <h5 class="text-center">Have you need to take a medical test?<br/>
        You can search below for available medical lab centres.
        </h5>
        <medical-lab/>
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
import SearchServices from '@/services/searchServices'
import Pharmacy from '@/components/features/pharmacy'
import navs from '@/platform/patientInterface/navs'
import BasicDetails from '@/components/widgets/basicDetails'
import Sidenav from '@/platform/patientInterface/sidenav'
import $ from 'jquery'
import Autocomplete from 'vue2-autocomplete-js'
import GetServices from '@/services/getServices'
import MedicalLab from '@/components/features/medicalLabs'
export default {
  components: {Interface, messages, Pharmacy, BasicDetails, Sidenav, Autocomplete, MedicalLab},
  name: 'index',
  data () {
    return {
      medicalrecord_icon: navs.links.medicalRecord.icon + ' x2 left',
      message_icon: navs.links.messages.icon + ' x2 left',
      cart_icon: navs.links.cart.icon + ' x2 left',
      updateprofile_icon: navs.links.updateProfile.icon + ' x2 left',
      search: '',
      allDocs: null,
      // searchErr: '',
      topLinks: {
        doLogOut: 'do-logout',
        goToProfile: navs.links.profile.url,
        toAppointment: navs.links.appointment.url
      },
      registeredDoctors: false,
      doctors: null,
      // docId: `/doctor_id`,
      docStatus: 'No registered doctor(s) yet!'
    }
  },
  sockets: {},
  mounted () {
    $('#docSearch').hide()
  },
  methods: {
    async getAllDocs () {
      const allDocs = (await GetServices.getAllDocs()).data
      this.allDocs = allDocs
    },
    getData (d) {
      console.log(d)
      return d
    },
    validateForm (e) {},
    async findDoctors () {
      let validSearchInput = {}
      if (this.search !== '' && this.search !== null && isNaN(this.search)) {
        validSearchInput.search = this.search.toLowerCase()
      } else {
        // this.searchErr = 'Please enter a valid input!'
        alert('Please enter a valid input!')
        console.log('Please enter a valid input!')
        return false
      }
      // console.log(validSearchInput)
      try {
        const doctors = (await SearchServices.findDoctors({query: validSearchInput.search})).data
        // let responseData = response.data
        console.log('doctors: ', doctors)
        $('#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div.col.s12').hide()

        $('#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div.platform-content#platform-content').hide()

        $('#pharmacy, #messages_conv, #medicalLab').hide()

        $('#docSearch').show()
        if (doctors.length > 0) {
          this.registeredDoctors = true
          this.docStatus = this.search
          this.doctors = doctors
          this.search = ''
        } else if (doctors.length === 0) {
          this.registeredDoctors = false
          this.docStatus = `Doctor not found!`
        } else {
          this.registeredDoctors = false
        }
      } catch (error) {
        if (error) {
          console.log(JSON.stringify(error.doctors))
        }
      }
    },
    viewDoc (docId) {
      // console.log('i was clicked')
      this.doctors.forEach(doc => {
        if (doc._id === docId) {
          this.$store.commit('SET_VIEWDOC', {viewDoc: doc})
          this.$router.push(`/patient/view-doctor/${doc.fullName.toLowerCase().split(' ')[0]}`)
        }
      })
    },
    createChannel (docId) {
      let newChannel, docFullName, channel, docEmail
      this.doctors.forEach((doc) => {
        // this.$store.state.consult.doctorName = docFullName
        // this.$store.state.consult.doctorEmail = docEmail
        if (doc._id === docId) {
          channel = `${this.$store.state.profile.fullName.replace(/\s/g, '').toLowerCase()}AND${doc.fullName.replace(/\s/g, '').toLowerCase()}`
          docFullName = doc.fullName
          docEmail = doc.email
          if (channel !== this.$store.state.consult.newRoom) {
            newChannel = channel
            this.$store.commit('SOCKET_CREATECHANNEL', {newRoom: newChannel})
            this.$store.commit('SET_DOCPATIENT', {doctorName: docFullName, doctorEmail: docEmail})
            if (confirm(`Are you sure you want to consult Doctor ${doc.fullName} with room name ${newChannel}?`)) {
              alert(`Successfully connected! You can now consult Doctor ${doc.fullName} by sending message to them. Kindly go back to your dashboard to proceed.`)
            }
            console.log(newChannel)
          } else {
            alert(`You are already connected to ${doc.fullName}. Kindly go to your dashboard to consult them.`)
          }
        }
      })
      console.log(this.$store.state.consult.doctorName)
    }
  }
}
</script>
<style>
#docSearch > div > div > h4 {
    padding: 0.5rem 0.3rem;
    border-radius: 15px;
}
div a.consultBtn {
  background-color: sandybrown !important;
} 
/* styling search doctor bar */
.eachDoctor {
  padding: 0.2rem 0.34rem;
  margin-top: 0.7rem;
}
div.doctorSearchResult a{
   margin: 0.3rem;
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

#pharmacy,
#messages_conv,
#medicalLab {
  margin-top: 0.08rem;
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

/* #medicalLab .show-content {
  height: 100vh;
} */
#messages_conv .show-content{
  height: 90.7vh;
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
 