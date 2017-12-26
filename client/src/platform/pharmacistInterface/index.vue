<template>
  <div class="pharmacist-dashboard">
    <interface>
      <template slot="fixed-nav-bar">
          <li><a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
          <li><a  id="profile" class="btn transparent white-text waves-effect waves-light">
          Profile
          </a></li>
          <li><a class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('do-logout')">
          Logout
          </a>
          </li>
      </template>

      <template slot="basic-details">
         <a href="#" class="w3-bar-item w3-button"><h6>Full Name:</h6>  <br/><h6 class="name"> Adeshina Taiwo A.</h6></a>
        <a href="#" class="w3-bar-item w3-button"><h6>Email Address:</h6>  <br>
        <h6 class="email">a.taiwoquadri@gmail.com</h6> </a>
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
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input id="drug_name" type="text" class="validate">
          <label for="drug_name">Drug Name</label>
        </div>
        <div class="input-field col s6">
          <input id="manufacturer" type="text" class="validate">
          <label for="manufacturer">Manufacturer</label>
        </div>
      </div>
      <div class="row">
         <div class="input-field col s6">
          <input id="price" type="number" class="validate" value="#">
          <label for="price">Price</label>
        </div>
      </div>
      <div class="row">
          <div class="input-field col s12">
          <textarea id="description" class="materialize-textarea" placeholder=""></textarea>
          <label for="reason">Brief Description</label>
          </div>
      </div>
        <h5 class="white-text"><a href="" class="submit btn waves-effect waves-light white-text blue">Submit</a></h5>
    </form>
  </div>
          </template>
        </modal>

        <!-- <a href="#" class="w3-bar-item w3-button">
          <i :class="add_icon"></i>
          Add drug 
        </a> -->
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
            <h5>You have not added any drug!</h5>
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
export default {
  components: {Interface, Pharmacy, Modal},
  name: 'index',
  data () {
    return {
      add_icon: navs.links.addDrug.icon + ' x2 left',
      orders_icon: navs.links.orders.icon + ' x2 left',
      updateprofile_icon: navs.links.updateProfile.icon + ' x2 left'
    }
  }
}
</script>

<style>
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
  height: 100vh;
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
