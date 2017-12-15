<template>
  <div class="pharmacist-dashboard">
    <interface>
      <template slot="fixed-nav-bar">
          <li><a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
          <li><a  id="profile" class="btn transparent white-text waves-effect waves-light">
          Profile
          </a></li>
          <li><a href="/" class="btn transparent white-text waves-effect waves-light">
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
        <a href="#" class="w3-bar-item w3-button">
          <i :class="add_icon"></i>
          Add drug 
        </a>
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
        <h5 class="text-center">Have you been prescribed drugs?<br/>
          Kindly search below and place your order.
        </h5>
        <div class="searchForm">
          <div class="row">
            <div class="col s12">
              <div class="row ">
                <form action="" class="search-drug">
                  <div class="input-field col s12">
                    <i class="icon ion-search x15"></i>
                    <input type="search" id="autocomplete-input" class="autocomplete" placeholder="Search through available drugs"/>
                  </div>
                </form>
                <div class="pharmacy-search-result">
                  <div class="show-content transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
export default {
  components: {Interface},
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
