<template>
  <div class="header-view">
      <nav class="blue white-text">
    <div class="nav-wrapper">
      <a href="/" class="brand-logo animated rollIn">BHS</a>
      
      <ul id="nav-mobile" class="right hide-on-med-and-down">
         <div  class="w3-dropdown-content w3-card blue white-text left" id="usersRegistration">
          <a href="/register-patient" title="patient">User</a>
          <div class="divider"></div>
          <a href="/register-doctor" title="medical doctor">Doctor</a>
          <div class="divider"></div>
          <a href="/register-pharmacist" title="pharmacist">Pharmacist</a>
          <div class="divider"></div>
          <a href="/register-medlabscientist" title="medical laboratory scientist">Medlab Scientist</a>
        </div>
        <!-- <div  class="w3-dropdown-content w3-card blue white-text left " id="usersLogin">
          <a href="/" title="patient">User</a>
          <div class="divider"></div>
          <a href="/" title="medical doctor">Doctor</a>
          <div class="divider"></div>
          <a href="/" title="pharmacist">Pharmacist</a>
          <div class="divider"></div>
          <a href="/" title="medical lab scientist">Medlab Scientist</a>
        </div> -->
        <slot name="navbar" class="nav right links">
          <li><a href="">Home</a></li>
          <li><a  id="registerAs" @click="toggoeDropdown">
          Register
          <i class="icon ion-arrow-down-b w3-xlarge right"></i>
          </a></li>
          <li><a href="/login">
          Login
          </a></li>
        <li><a href="/">About</a></li>
        </slot>
        
      </ul>
    </div>
  </nav>

  </div>
</template>

<script>
  export default{
    name: 'navbar',
    methods: {
      toggoeDropdown () {
        let showRegDropdown = document.getElementById('usersRegistration')
        showRegDropdown.classList.toggle('w3-show')
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

