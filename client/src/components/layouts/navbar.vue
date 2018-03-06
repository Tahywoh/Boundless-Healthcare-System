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
            <!-- menu icon for desktop devices -->
            
            <li><router-link to="/">Home</router-link></li>
            <span class="ifLoggedIn" v-if="this.$store.state.isUserLoggedIn">
              <li ><a id="dashboard" @click="$eventBus.$emit('go-to-dashboard')">
                Dashboard
              </a></li>
              <li ><a @click="$eventBus.$emit('do-logout')">
              Logout
              </a></li>
            </span>
            <span class="ifLoggedOut"  v-else>
              <li ><a  id="registerAs" @click="toggleDropdown">
              Register
              <i class="icon ion-arrow-down-b w3-xlarge right"></i>
              </a></li>
              <li><router-link to="/login">
              Login
              </router-link></li>
            </span>
          <li><router-link to="/about-BHS">About</router-link></li>


          <!-- mobile device menus -->
          </slot>

        </ul>
        <slot name="mobileNav">
            <ul id="slide-out" class="side-nav hide blue white-text darken-2">
              
              <span class="right">
                <a class="right" @click="closeSideNav"><i class="icon ion-close-circled"></i></a>
              </span>
              <li> <router-link to="/">Home</router-link></li>
              <div class="divider"></div>
              <span class="ifLoggedIn" v-if="this.$store.state.isUserLoggedIn">
              <li ><a id="dashboard" @click="$eventBus.$emit('go-to-dashboard')">
                Dashboard
              </a></li>
              <div class="divider"></div>
              <li ><a @click="$eventBus.$emit('do-logout')">
              Logout
              </a></li>
            </span>
            <span class="ifLoggedOut"  v-else>
              <li ><a  id="regAs" @click="dropDownMenu" class="w3-dropdown-hover">
              Register
              <i class="icon ion-arrow-right-b w3-xlarge right"></i>
              </a>
              <div  class="w3-dropdown-content w3-card blue white-text left" id="usersRegistration">
                <router-link to="/register/patient" title="patient">User</router-link>
                <div class="divider"></div>
                <router-link to="/register/doctor" title="medical doctor">Doctor</router-link>
                <div class="divider"></div>
                <router-link to="/register/pharmacist" title="pharmacist">Pharmacist</router-link>
                <div class="divider"></div>
                <router-link to="/register/medlabscientist" title="medical laboratory scientist">Medlab Scientist</router-link>
              </div>
              </li>
              <div class="divider"></div>
              <li><router-link to="/login">
              Login
              </router-link></li>
            </span>
              <div class="divider"></div>
              <li><a href="">About</a></li>
            </ul>

            <a href="#" data-activates="slide-out" class="right hide-on-med-and-up" id="sideMenu" @click="openSideNav">
              <i class="ion-navicon-round x2"></i>
            </a>
        </slot>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default{
    name: 'navbar',
    methods: {
      toggleDropdown () {
        let showRegDropdown = document.getElementById('usersRegistration')
        showRegDropdown.classList.toggle('w3-show')
      },
      openSideNav () {
        // let getTriggerButton = document.getElementById('sideMenu')
        // let getNavUl = document.getElementById('slide-out')
        // getNavUl.style.display = 'block !important'
        // getTriggerButton.style.display = `none`
        $('#sideMenu').hide()
        $('#slide-out').removeClass('hide')
        $('#slide-out').show()
      },
      closeSideNav () {
        // let getTriggerButton = document.getElementById('sideMenu')
        // let getNavUl = document.getElementById('slide-out')

        // getNavUl.style.display = 'none'
        // getTriggerButton.style.display = 'block'
        $('#slide-out').addClass('hide')
        $('#slide-out').hide()
        $('#sideMenu').show()
      }
    },
    ready () {
      document.getElementById('slide-out').style.display = 'none'
    },
    data () {
      return {
        dashboard: 'go-to-dashboard'
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


/* styling mobile nav */
#slide-out > li {
  width: 100%;
  display: block;
  /* padding: 4px 12px 4px 16px; */
  text-decoration: none;
  cursor: pointer;
  /* background-color: grey; */
}

#slide-out {
  width: 155px;
  text-align: left;
  margin: auto 50%;
    min-height: auto;
    max-width: 220px;
    position: fixed !important;
    z-index: 1;
    overflow: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

#slide-out li a:hover {
  background-color: rgba(0,0,0,0.1);
}
</style>

