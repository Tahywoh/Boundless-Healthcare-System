<template>
  <div class="main-interface">
    <navbar>
        <template slot="search-doctor">
          <slot name="consult-doctor">  
          </slot>
        
      </template>
      
      <div slot="navbar">
        <slot name="fixed-nav-bar">
          <li><a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
          <li><a id="profile" class="btn transparent white-text waves-effect waves-light"  @click="$eventBus.$emit('go-to-profile')">
          Profile
          </a></li>
          <li><a class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('go-to-appointment')">Appointment
          </a>
          </li>
          <li><a  class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('do-logout')">
          Logout
          </a>
          </li>
        </slot>
       
      </div>
    </navbar>
    <div class="content">
      <div class="w3-sidebar w3-light-grey w3-bar-block fixed-side-nav" style="width:25%">
        <div class="basic-details">
          <slot name="basic-details">
            
          </slot>
        </div>
        <div class="side-nav-content">
          <slot name="side-nav-content">

          </slot>
        </div>
      </div>
        
    </div>
    

        <!-- Page Content -->
      <div style="margin-left:25%">

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
  }
}
</script>

<style>
html,
body {
  background-color: #f1f1f1 !important;
}
 div > div.header-view > nav {
  /* position: fixed !important; */
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
form.search-doctor i.icon.ion-search.x15 {
    left: 17.4rem;
    font-weight: 100 !important;
    font-size: 1.89rem;
    top: -0.8rem;
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
    padding: 0 0rem !important;
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
