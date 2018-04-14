<template>
  <div class="header-view navbar-fixed">
    <nav class="blue white-text">
      <div class="nav-wrapper">
        
          <a data-target="slide-out-mobile" class="sidenav-trigger">
            <slot name="mobileSideNavTrigger">
               <!-- <i class="icon ion-android-arrow-dropleft left x35" v-if="this.$store.state.isUserLoggedIn"></i> -->
            </slot>
          </a>
          <ul id="slide-out-mobile" class="sidenav hide-on-med-and-up show-on-small-only grey-text blue">
            <slot name="mobileSideNav">
            </slot>
          </ul>
         <router-link to="/" class="brand-logo animated rollIn flow-text left">BHS</router-link>
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
        <a class="right hide-on-med-and-up mobile-dropdown-trigger" data-target="mobileNav" id="sideMenu">
              <i class="ion-navicon-round x2"></i>
        </a>
        <div class="blue-text">
          <ul id='regAs' class='dropdown-content hide-on-med-and-up blue-text'>
                <router-link to="/register/patient" title="patient">User</router-link>
                <div class="divider"></div>
                <router-link to="/register/doctor" title="medical doctor">Doctor</router-link>
                <div class="divider"></div>
                <router-link to="/register/pharmacist" title="pharmacist">Pharmacist</router-link>
                <div class="divider"></div>
                <div class="divider"></div>
                <router-link to="/register/medlabscientist" title="medical laboratory scientist">Medlab Scientist</router-link>
          </ul>
          <ul id='mobileNav' class='dropdown-content hide-on-med-and-up'>
          <slot name="mobileNav"> 
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <div class="divider"></div>
              <span class="ifLoggedIn" v-if="this.$store.state.isUserLoggedIn">
                <li>
                <a @click="$eventBus.$emit('go-to-dashboard')">Dashboard</a>
              </li>
              <div class="divider"></div> 
              <li>
                <a @click="$eventBus.$emit('do-logout')">
              Logout
                </a>
              </li>
              </span>
              <span class="ifLoggedOut" v-else>
                <div class="divider"></div>
                <li>
                  <router-link to="/register/patient" title="patient">Sign up as User</router-link>
                </li>
              <div class="divider"></div>
              <li>
               <router-link to="/register/doctor" title="medical doctor">Sign up as Doctor</router-link>
              </li>
              <div class="divider"></div>
              <li>
                <router-link to="/register/pharmacist" title="pharmacist">Sign up as Pharmacist</router-link>
              </li>
              <li>
                <div class="divider"></div>
                <router-link to="/register/medlabscientist" title="medical laboratory scientist">Sign up as Medlab Scientist</router-link>
              </li>
              <div class="divider"></div>
              <li>
                <router-link to="/login">Login</router-link>
              </li>
              </span>
              <div class="divider"></div>
               <li>
                <router-link to="/about-BHS">About</router-link>
              </li>
            </slot>
        </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import M from 'materialize-css'
  export default{
    methods: {
      toggleDropdown () {
        let showRegDropdown = document.getElementById('usersRegistration')
        showRegDropdown.classList.toggle('w3-show')
      }
    },
    ready () {
      document.getElementById('slide-out').style.display = 'none'
    },
    mounted () {
      var elem = document.querySelector('.mobile-dropdown-trigger')
      // eslint-disable-next-line
      var instance = new M.Dropdown(elem, {
        alignment: 'right'
      })

      // taking care of mobile side nav
      var el2 = document.querySelector('#slide-out-mobile')
      // eslint-disable-next-line
      var instance = new M.Sidenav(el2, {
        draggable: true
      })
    },
    data () {
      return {
        dashboard: 'go-to-dashboard'
      }
    }
}
</script>

<style>
#mobileNav  a {
  color: #2691f3 !important;
  font-size: 16px !important;
}

.dropdown-content li {
  width: 134%;
}
.dropdown-content li a:hover, .dropdown-content li a:active, .dropdown-content li a:focus {
  background-color: grey;
  color: #fff;
}

nav div.nav-wrapper{
  margin: 0 1.4rem;
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

