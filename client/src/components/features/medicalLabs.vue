<template>
  <div class="medicallLabs" id="registeredLabs">
      <div id="bookAppointmentWithLabScientist" class="modal">
      <div class="modal-content">
        <span class="right modal-close">x</span>
      <h4 class="blue white-text text-center center-align" style="padding: 0.4rem;
    width: 50%;
    margin-left: 26%;">Book Appointment</h4>
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
              Laboratory Name
              <input id="doctor" type="text" data-length="10" required v-model="formData.laboratoryName" disabled>
            </div>
            <div class="input-field col s6">
              Laboratory Scientist
              <input id="doctor" type="text" data-length="10" required disabled v-model="formData.laboratoryScientist">
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
              <b>Note:</b>&nbsp;The doctor or laboratory scientist is meant to specify date along with either the appointment is pending, accepted or canceled. And if the date is not feasible for him/her, he can always change it as well.
            </small>
          </div>
          <div class="row text-center">
            <small class="errMsg red-text text-center" >
              {{errMsg}}
            </small>
          </div>
          <div class="modal-footer">
            <h5 class="white-text"><button type="submit"  class="submit btn-flat
             waves-light white-text blue modal-action">Submit</button></h5>
          </div>
          
        </form>
      </div>
    </div>
    </div>
    <!-- <div id="bookAppointmentWithLabScientist" class="modal">
    <div class="modal-content">
      <h4 class="center-align blue white-text" style="padding: 0.3rem;">Book Appointment</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div> -->
          
    <div class="searchForm">
      <div class="row">
        <div class="col s12">
          <div class="row ">
            <form action="" class="search-drug" @submit.prevent="validateForm" @submit="findLabs">
              <div class="input-field col s12">
                <i class="icon ion-search x15" @click="findLabs"></i>
                <input type="search" class="autocomplete-labSearch" placeholder="Search through registered laboratory centres" v-model="searchLab" id="labSearch"/>
              </div>
              <small class="searchErr red-text text-center" v-html="searchErr"></small>
            </form>
            
          </div>
          <div class="lab-search-result">
            <div class="show-content">
              <div class="text-center center-align" v-if="!registeredLab">
              <h5>
                No registered laboratories yet!<br/>
              </h5> 
              </div>
            <div class="white blue-text eachLab" v-for="(allLab, index) in allLabs" :key="allLab._id" :id="index" v-else>
              <ul >
                <li>
                  <div class="collapsible-header blue-text" v-if="allLab.laboratoryName">
                    <h5 class="" @click="toViewLab(allLab._id)" :id="index">
                      {{allLab.laboratoryName}}
                    </h5>
                      <a class="btn waves-effect x1 right blue modal-trigger" data-target="bookAppointmentWithLabScientist" @click="setLabData(allLab.laboratoryName, allLab.email)">
                       Book Appointment
                      </a>
                  </div>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import GetServices from '@/services/getServices'
import SearchServices from '@/services/searchServices'
import M from 'materialize-css'
export default {
  data () {
    return {
      allLabs: null,
      registeredLab: true,
      searchLab: '',
      searchErr: '',
      errMsg: '',
      formData: {
        reason: '',
        laboratoryName: '',
        laboratoryScientist: '',
        setTime: {
          start: '',
          end: ''
        },
        patient: this.$store.state.profile.email
      }
    }
  },
  async mounted () {
    try {
      const allLabs = (await GetServices.getAllLabs()).data
      if (allLabs.length > 0) {
        this.registeredLab = true
        this.allLabs = allLabs
        console.log(this.allLabs)
      } else {
        this.registeredLab = false
      }
    } catch (error) {
      console.log(error)
    }
    if (this.searchLab) {
      let searchOptions = {}
      this.allLabs.forEach(lab => {
        searchOptions[`${lab.laboratoryName}`] = null
      })
      var elem = document.querySelector('#labSearch')
      // eslint-disable-next-line
      var instance = new M.Autocomplete(elem, {
        data: searchOptions,
        limit: 20,
        minLength: 1
      })
    }
    var el = document.querySelector('.modal')
    // eslint-disable-next-line
    var instance = new M.Modal(el, {})
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
    setLabData (labName, labScientist) {
      this.formData.laboratoryName = labName
      this.formData.laboratoryScientist = labScientist
      console.log(this.formData)
      console.log(labName, labScientist)
    },
    validateForm (e) {},
    async findLabs () {
      let validateSearchInput = {}
      if (this.searchLab !== '' && this.searchLab !== null && isNaN(this.searchLab)) {
        validateSearchInput.query = this.searchLab.toLowerCase()
      } else {
        this.searchErr = 'Please enter a valid input.'
        return
      }
      try {
        const lab = (await SearchServices.findLabs(validateSearchInput)).data
        if (lab.length > 0) {
          this.searchLab = ''
          this.searchErr = ''
          this.allLabs = lab
        } else {
          this.allLabs = null
          this.searchErr = 'Laboratory not found.\nThe medical laboratory center you are looking for has not been registered yet!'
        }
      } catch (error) {
        console.log(error)
      }
    },
    toViewLab (labId) {
      this.allLabs.forEach(lab => {
        if (lab._id === labId) {
          this.$store.commit('SET_CURRENTLAB', {currentLab: lab})
          this.$router.push(`/${encodeURI('medical laboratory')}/user/view-${Math.floor(Math.random() * 951732548)}`)
        }
      })
    }
  }
}
</script>

<style>
#bookAppointmentWithLabScientist {
  top: 4% !important;
  max-width: max-content;
  max-height: 90%;
}
input#labSearch {
    border: 2px solid;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    width: 80%;
    margin: 0rem auto;
}
#registeredLabs ul li div > h5 {
  text-align: left !important;
}
div#registeredLabs ul li div > a {
  font-size: 0.6rem !important;
  padding: 0 0.5rem !important;
  margin-left: 18%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
  #medicalLab > div > div > div > div > div.lab-search-result > div > div > ul > li > div.collapsible-header.blue-text > h5.right.grey.darken-3 > a{
  height: 36px;
  width: 9rem;
  line-height: 36px;
  padding: 0px 0.5rem;
}
#medicalLab > div > div > div > div > div.lab-search-result > div > div > ul > li > div.collapsible-body > small{
  padding: 0.3rem;
  font-size: 1rem !important;
}
#medicalLab > div > div > div > div > div.lab-search-result > div > div > ul > li > div.collapsible-header.blue-text > h5.right.grey.darken-3 > span {
  margin-left: auto;
  padding: 0.3rem 0.2rem;
}
#medicalLab > div > div > div > div > div.lab-search-result > div > div > ul > li > div.collapsible-header.blue-text > h5.right {
  margin-left: auto
}

</style>
