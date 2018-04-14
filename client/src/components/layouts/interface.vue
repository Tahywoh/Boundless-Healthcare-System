<template>
  <div class="main-interface">
    <navbar>
      <template slot="mobileSideNavTrigger">
        <i class="icon ion-android-arrow-dropleft left x35" v-if="this.$store.state.isUserLoggedIn"></i>
      </template>
      <template slot="mobileSideNav">
          <slot name="mobile-side-nav-content"></slot>
      </template>
        <template slot="search-doctor">
          <slot name="consult-doctor">  

          </slot>
      </template>
      
      <div slot="navbar">
        <slot name="fixed-nav-bar">
          <li><router-link to="/" class="btn transparent white-text waves-effect">Home</router-link></li>
          <li><a id="profile" class="btn transparent white-text waves-effect"  @click="$eventBus.$emit('go-to-profile')">
          Profile
          </a></li>
          <li ><a class="btn transparent white-text waves-effect" @click="$eventBus.$emit('go-to-appointment')">Appointment
          </a>
          </li>
          <li><a  class="btn transparent white-text waves-effect" @click="$eventBus.$emit('do-logout')">
          Logout
          </a>
          </li>
        </slot>
       
      </div>
      <div slot="mobileNav">
        <slot name="fixed-mobile-nav">
          <li><router-link to="/" >Home</router-link></li>
          <div class="divider"></div>
          <li><a id="profile"   @click="$eventBus.$emit('go-to-profile')">
          Profile
          </a></li>
          <div class="divider"></div>
          <li v-if="this.$store.state.userType !== 'Pharmacist'"><a @click="$eventBus.$emit('go-to-appointment')">Appointment
          </a>
          </li>
          <div class="divider"></div>
          <li><a  @click="$eventBus.$emit('do-logout')">
          Logout
          </a>
          </li>
        </slot>
      </div>
    </navbar>
    <div class="content row m4">
      <div class="w3-sidebar w3-light-grey w3-bar-block fixed-side-nav col m5 hide-on-small-only" style="width:25%; margin-top: 1rem;">
      <div class="divider"></div>
        <h4 class="header grey darken-3 white-text center-align text-center" style="padding: 0.8rem;">{{uType}} Dashboard</h4>
        <div class="basic-details">
          <slot name="basic-details">
            
          </slot>
        </div>
        <div class="side-nav-content col m7 s12">

          <slot name="side-nav-content">

          </slot>
        </div>
      </div>
        
    </div>
    

        <!-- Page Content -->
      <div class="majorContent col m8 s12" id="majorContent">

        <div class="w3-container w3-teal">
          <div class="user-type-img">
            <slot name="user-type-img">
            
            </slot>
          </div>
        </div>

        <div class="w3-container">
          <div class="row">
            <div class="col s12">
              <slot name="ul-tabs">
              
              </slot>
            </div>
          <div class="platform-content">
            <slot name="platform-content">    

            </slot>
          </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script scoped>
import navbar from '@/components/layouts/navbar'
import Fixednav from '@/components/layouts/fixednav'
export default{
  name: 'main-interface',
  components: {
    navbar, Fixednav
  },
  data () {
    return {
      uType: this.$store.state.userType
    }
  }
}
</script>

<style>
html,
body {
  background-color: #f1f1f1 !important;
}
#app > div > div > div:nth-child(3) {
  margin-left: 25%;
}
#side-nav {
  width: max-content;
}
 div > div.header-view > nav {
  position: fixed !important;
  z-index: 300;
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
#app > div > div > div.header-view > nav > div > div.row.consult-doctor.left > form > div {
  margin-left: 2rem;
  margin-top: 1rem;
}
form.search-doctor i.icon.ion-search.x15 {
    left: 16.4rem;
    font-weight: 100 !important;
    font-size: 1.89rem;
    top: -1.2rem;
}
form.search-doctor .input-field.col.s12 {
    margin-top: 0.9rem;
    margin-left: 1.3rem;
}

a.w3-bar-item.w3-button {
  margin: 0.5rem 0;
}
.basic-details {
  /* padding: -0.5rem 0 !important; */
    margin-top: 1.5rem;
}
div > div.content {
  /* padding-top: 4rem; */
}
div ul {
    z-index: 0;
}
div.main.flow-text
  > div.content.center-align.white-text
  > div
  > div
  > form
  > div
  > div {
  margin: 0.5rem 0rem 0px 0px !important;
}
nav ul a:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #fff;
  /* margin: 0 0.25rem; */
}
#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div.col.s12 > ul{
  margin: auto -0.8rem;
  width: initial;
  padding: 0 !important;
}
nav ul a:focus,
nav ul a:active {
  border-bottom: 2px solid #fff;
}
/* nav ul a {
  font-size: 0.7rem !important;
  padding: 0 1rem !important;
} */
div.fixed-side-nav {
  padding: 0.2rem 0.5rem;
  overflow: hidden;
}
div.side-nav-content {
  padding-top: 1.8rem;
}
div.side-nav-content a {
  line-height: 35px;
  padding: 4.8rem 0;
}
div.w3-container {
  background-color: rgba(210, 206, 196, 0.6) !important;
}
.tabs .tab a:hover,
.tabs .tab a.active {
  background-color: #37474f !important;
  color: #fff !important;
}

.tabs .tab a,
.tabs .tab a {
  background-color: #2196f3 !important;
  color: #fff !important;
}
#app
  > div
  > div.content
  > div:nth-child
  > div
  > div
  > div.col.s12
  > ul
  > li
  > a {
  border-radius: 0px;
}
.notification-circle{
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
}
</style>
