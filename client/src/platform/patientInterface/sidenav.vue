<template>
  <div id="side-nav">
     <div class="divider"></div>
    <router-link class="w3-bar-item w3-button" :to="medRecord">
      <i :class="medicalrecord_icon"></i>
      Medical record
    </router-link>
    <div class="divider"></div>
    <!-- <router-link to="/Patient-interface#messages_conv" class="w3-bar-item w3-button">
      <i :class="message_icon"></i>  
      Messages 
      <span class="circle blue notification-circle">2</span>
    </router-link> -->
    <div class="divider"></div>
    <router-link :to="carts" class="w3-bar-item w3-button">
      <i :class="cart_icon"></i>
      Cart 
      <span class="circle blue notification-circle" v-if="patientCarts > 0">{{patientCarts}}</span>
    </router-link>
    <div class="divider"></div>
    <router-link class="w3-bar-item w3-button" :to="updateProfile">
       <i :class="updateprofile_icon"></i>
      Update Profile
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import navs from '@/platform/patientInterface/navs'
export default {
  name: 'sidenav',
  data () {
    return {
      medRecord: navs.links.medicalRecord.url,
      updateProfile: navs.links.updateProfile.url,
      medicalrecord_icon: navs.links.medicalRecord.icon + ' x2 left',
      message_icon: navs.links.messages.icon + ' x2 left',
      cart_icon: navs.links.cart.icon + ' x2 left',
      carts: navs.links.cart.url,
      updateprofile_icon: navs.links.updateProfile.icon + ' x2 left',
      patientCarts: this.$store.state.userData.patientCarts.cartNo || 0
    }
  },
  mounted () {}
}
</script>
<style scoped>
div.side-nav-content {
  padding-top: 0rem !important;
}
</style>
