<template>
  <div class="pharmacist-dashboard">
    <interface>
      <template slot="fixed-nav-bar">
          <li><a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
          <li><a  id="profile" class="btn transparent white-text waves-effect waves-light" :href="goToProfile">
          Profile
          </a></li>
          <li><a class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('do-logout')">
          Logout
          </a>
          </li>
      </template>

      <template slot="basic-details">
         <basicDetails/>
      </template>

      <template slot="side-nav-content">
        <div class="divider"></div>
        <modal>
          <div slot="triggerModal">
            <a href="#" class="transparent black-text"><i :class="add_icon"></i>Add drug</a>  
          </div>
          <template slot="modal-title">Add Drug</template>
          <template slot="modal-content">
              <div class="row">
                <form class="col s12" @input="errorMsg" @submit.prevent="validateForm">
                  <div class="row">
                    <div class="input-field col s6">
                      <input id="drug_name" type="text" class="validate" v-model="formData.drugName" required>
                      <label for="drug_name">Drug Name</label>
                    </div>
                    <div class="input-field col s6">
                      <input id="manufacturer" type="text" class="validate" v-model="formData.manufac">
                      <label for="manufacturer">Manufacturer</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s6">
                      <input id="price" type="number" class="validate" value="# " v-model="formData.price" min="50" max="50000" placeholder="Default currency is Naira  required(#)">
                      <label for="price">Price</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <textarea id="briefDescrip" class="materialize-textarea" v-model="formData.briefDescription" required></textarea>
                      <label for="briefDescrip">Brief Description</label>
                    </div>
                  </div>
                   <small class="red-text errorMsg center-align" v-html="errorMsg"></small><br/>
                    <button type="submit" class="submit btn waves-effect waves-light white-text blue center-align text-center" @click="addToPharmacy">Submit</button>
                </form>
              </div>
            </template>
        </modal>

        <div class="divider"></div>
        <a href="#" class="w3-bar-item w3-button">
          <i :class="orders_icon"></i>
          &nbsp;Orders
          <span class="circle blue notification-circle">4</span>
        </a>
        <div class="divider"></div>
        <a href="#" class="w3-bar-item w3-button">
          <i :class="updateprofile_icon"></i>Update Profile</a>
      </template>

      <template slot="user-type-img">
         <img src="../../assets/platform/pharm21.jpg" alt="patient-img" width="105%" height="295px" class="responsive-img">
      </template>

      <template slot="ul-tabs">
        <ul class="tabs"> 
          <li class="tab col s6"><a href="#pharmacy" class="btn waves-effect waves-light">Pharmacy</a></li>
          <li class="tab col s6"><a  href="#drugs" class="btn waves-effect waves-light">Drugs</a></li>
        </ul>
      </template>

      <template slot="platform-content">
        <div id="pharmacy" class="col s12 w3-card">
          <h5 class="text-center">
            Kindly search through available drugs here.
          </h5>
        <pharmacy/>
        </div>
        <div id="drugs" class="col s12 w3-card">
          <div class="drugs transparent show-content">
            <h4 class="text-center center-align blue darken-2 white-text z-depth-2">Your Products</h4>
            <div class="text-center center-align" v-if="!registeredUserDrug">
              <h5>{{pharmacistDrugStatus}}</h5> 
            </div>
            <div class="blue-grey white-text eachUserDrug" v-for="userDrug in userDrugs" :key="userDrug._id" v-else>
              <ul class="collapsible user_drugs" data-collapsible="accordion">
                <li>
                  <div class="collapsible-header blue-text">
                    <h5 class="left">{{userDrug.drugName}}</h5>
                    <h5 class="right grey darken-3">Price: &nbsp; 
                      <span class="right">
                        {{userDrug.price}}
                      </span>
                    </h5>
                  </div>
                  <div class="collapsible-body">
                    <h6>Description: </h6>
                    <span v-text="userDrug.briefDescription"></span><br/><br/>
                    <h6>Manufacturer:</h6> <small class="grey lighten-4 blue-text" v-text="userDrug.manufac"></small>
                  </div>
                </li>
              </ul>
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
import navs from '@/platform/pharmacistInterface/navs'
import Pharmacy from '@/components/features/pharmacy'
import Modal from '@/components/snippets/modal'
import BasicDetails from '@/components/widgets/basicDetails'
import PharmacyServices from '@/services/pharmacyServices'
import GetServices from '@/services/getServices'
export default {
  components: {Interface, Pharmacy, Modal, BasicDetails},
  name: 'index',
  data () {
    return {
      add_icon: navs.links.addDrug.icon + ' x2 left',
      orders_icon: navs.links.orders.icon + ' x2 left',
      updateprofile_icon: navs.links.updateProfile.icon + ' x2 left',
      goToProfile: navs.links.profile.url,
      currency: '#',
      errorMsg: '',
      pharmacistDrugStatus: 'You have not added any drug!',
      formData: {
        drugName: '',
        manufac: '',
        price: '',
        briefDescription: '',
        seller: this.$store.state.profile.pharmacyName
      },
      userDrugs: null,
      registeredUserDrug: false
    }
  },
  async mounted () {
    // this.getCurrentUserDrugs()
    let validSeller = {}
    if (this.$store.state.profile.pharmacyName) {
      validSeller.userDrugs = this.$store.state.profile.pharmacyName
    }
    try {
      let userDrugs = (await GetServices.getCurrentUserDrugs({user: validSeller.userDrugs})).data
      this.userDrugs = userDrugs
      if (this.userDrugs !== null) {
        this.registeredUserDrug = true
      } else {
        this.registeredUserDrug = false
      }
    } catch (error) {
      if (error) {
        console.log(JSON.stringify(error))
      }
    }
    console.log(this.userDrugs)
  },
  methods: {
    validateForm (e) {},
    async addToPharmacy () {
      let validateDrug = {}
      if (this.formData.drugName !== '') {
        validateDrug.drugName = this.formData.drugName
      } else if (this.formData.drugName === null) {
        this.errorMsg = 'Please enter a valid drug name!'
        return false
      }
      if (this.formData.price !== null && !(this.formData.price < 50)) {
        validateDrug.price = this.currency + this.formData.price
      }
      if (this.briefDescription !== null) {
        validateDrug.briefDescription = this.formData.briefDescription
      }
      validateDrug.manufac = this.formData.manufac
      validateDrug.seller = this.formData.seller
      try {
        const response = await PharmacyServices.addToPharmacy(validateDrug)
        let responseData = response.data
        console.log(responseData)
        alert('Your drug has been successfully added!')
        document.getElementById('id01').style.display = 'none'
      } catch (error) {
        if (error) {
          this.errorMsg = error.response.data
        }
      }
    }
  }
}
</script>

<style>
#drugs h5.right{
  text-transform: uppercase !important;
}
#drugs > div > div > ul > li > div.collapsible-body > small{
  padding: 0.3rem;
}
#drugs > div > div > ul > li > div.collapsible-header.blue-text > h5.right {
  margin-left: auto;
  padding: 0.3rem;
  font-size: 19px;
}
#drugs > div > h4 {
    padding: 0.8rem 1rem;
}
#id01 > div > div > div > div > form > small{
  position: absolute;
  bottom: 4.5rem;
}
#id01 > div > header > h2{
  color: #fff !important;
}
#id01 > div > div > p > div > form > div:nth-child(2){
  margin-top: -1.5rem;
}
#id01 > div > div > p > div > form > h5 > a {
  padding: 0.2rem 1.2rem;
  line-height: 32px;
  margin-top: -3rem;
}
#id01 > div > div > p > div > form > div:nth-child(1) {
    margin-top: -0.9rem !important;
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
#id01 > div > div > p > div > form > div > div {
  padding-top: 1rem;
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
#drugs > div > div > div > div > div {
  padding-top: 5rem;
  height: 100vh !important;
}
#drugs .show-content, #pharmacy .show-content{
  min-height: 30vh;
}
h5{
  text-align: center !important;
}

#pharmacy, #drugs{
  margin-top: 0.08rem;
}

.basic-details {
  margin-top: 1.5rem !important;
}

</style>
