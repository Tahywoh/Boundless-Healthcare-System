<template>
  <div class="header-view">
      <nav class="blue white-text">
    <div class="nav-wrapper">
      <slot name="brand-logo">
         <router-link to="/" class="brand-logo animated rollIn flow-text left">BHS</router-link>
      </slot>
     
      <slot name="search-doctor">
         
      </slot>
      <ul id="nav-mobile" class="right hide-on-small-only">
         <div  class="w3-dropdown-content w3-card blue white-text left" id="usersRegistration">
          <router-link to="/register/patient" title="patient">User</router-link>
          <div class="divider"></div>
          <router-link to="/register/doctor" title="medical doctor">Doctor</router-link>
          <div class="divider"></div>
          <router-link to="/register/pharmacist" title="pharmacist">Pharmacist</router-link>
          <div class="divider"></div>
          <router-link to="/register/medlabscientist" title="medical laboratory scientist">Medlab Scientist</router-link>
        </div>
        
        <slot name="navbar" class="nav right links">
          <li><router-link to="/">Home</router-link></li>
          <li ><a  id="registerAs" @click="toggleDropdown">
          Register
          <i class="icon ion-arrow-down-b w3-xlarge right"></i>
          </a></li>
          <li ><router-link to="/login">
          Login
          </router-link></li>
        <li ><router-link to="/about-BHS">About</router-link></li>
        </slot>
      </ul>
    </div>
  </nav>
<router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'navbar',
    methods: {
      toggleDropdown () {
        let showRegDropdown = document.getElementById('usersRegistration')
        showRegDropdown.classList.toggle('w3-show')
      },
      data () {
        return {
          dashboard: this.$store.state.userType + `-interface`
        }
      }
    }
}
</script>

<style>

nav div.nav-wrapper{
  margin: 0 6rem;
}
div ul{
  padding: 0 3rem;
}
a.brand-logo{
  position: relative !important;
  float: left;
}
#usersRegistration, #usersLogin {
    z-index: 200;
    top: 4.3rem;
}
#usersLogin{
  right: 3.9rem;
  text-align: left;
}
#usersRegistration{
  right: 10rem;
  text-align: left;
}
</style>

