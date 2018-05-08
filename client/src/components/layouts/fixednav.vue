<template>
  <div>
    <navbar>
      <template slot="navbar">
        <slot name="fixed-nav-bar">
          <li>
        <router-link to="/" class="btn transparent white-text waves-effect">Home</router-link></li>
        <li><a id="profile" class="btn transparent white-text waves-effect" @click="$eventBus.$emit('go-to-profile')">
          Profile
        </a></li>
          <li><a @click="$eventBus.$emit(topLinks.toAppointment)" class="btn transparent white-text waves-effect">Appointment
        </a>
        </li>
        <li><a  class="btn transparent white-text waves-effect" @click="$eventBus.$emit(topLinks.doLogOut)">
        Logout
        </a>
      </li>
      </slot>
      </template>
      <template slot="mobileNav">
      <slot name="fixed-mobile-nav">
          <li><router-link to="/" >Home</router-link></li>
          <div class="divider"></div>
          <li><a id="profile"   @click="$eventBus.$emit('go-to-profile')">
          Profile
          </a></li>
          <div class="divider"></div>
          <li><a @click="$eventBus.$emit('go-to-appointment')">Appointment
          </a>
          </li>
          <div class="divider"></div>
          <li><a  @click="$eventBus.$emit('do-logout')">
          Logout
          </a>
          </li>
        </slot>
      </template>
    </navbar>
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from '@/components/layouts/navbar'
export default {
  components: {Navbar},
  data () {
    return {
      topLinks: {
        doLogOut: 'do-logout',
        toAppointment: 'go-to-appointment'
      }
    }
  }
}
</script>
<style scoped>
 div > div.header-view > nav {
  z-index: 300;
}
nav ul a:focus,
nav ul a:active {
  border-bottom: 2px solid #fff;
}
nav ul a {
  font-size: 0.7rem !important;
  padding: 0 1rem !important;
}
div.fixed-side-nav {
  padding: 0.2rem 0.5rem;
  overflow: hidden;
}
</style>
