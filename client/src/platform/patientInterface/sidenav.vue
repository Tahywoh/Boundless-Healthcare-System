<template>
  <div id="side-nav">
     <div class="divider"></div>
    <a href="#" class="w3-bar-item w3-button">
      <i :class="medicalrecord_icon"></i>
      Medical record
    </a>
    <div class="divider"></div>
    <router-link to="/Patient-interface#messages_conv" class="w3-bar-item w3-button">
      <i :class="message_icon"></i>  
      Messages 
      <span class="circle blue notification-circle">2</span>
    </router-link>
    <div class="divider"></div>
    <a href="#" class="w3-bar-item w3-button">
      <i :class="cart_icon"></i>
      Cart 
      <span class="circle blue notification-circle">4</span>
    </a>
    <div class="divider"></div>
    <a href="#" class="w3-bar-item w3-button">
       <i :class="updateprofile_icon"></i>
      Update Profile
    </a>
    <router-view></router-view>
  </div>
</template>

<script>
import navs from '@/platform/patientInterface/navs'
export default {
  name: 'sidenav',
  data () {
    return {
      medicalrecord_icon: navs.links.medicalRecord.icon + ' x2 left',
      message_icon: navs.links.messages.icon + ' x2 left',
      cart_icon: navs.links.cart.icon + ' x2 left',
      updateprofile_icon: navs.links.updateProfile.icon + ' x2 left'
    }
  }
}
</script>
<style scoped>
div.side-nav-content {
    padding-top: 0rem !important;
}
</style>
