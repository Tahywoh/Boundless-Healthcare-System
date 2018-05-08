<template>
  <div class="medical-records">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <router-link to="/" class="btn transparent white-text waves-effect">Home</router-link></li>
        <li><a id="profile" class="btn transparent white-text waves-effect" @click="$eventBus.$emit('go-to-profile')">
          Profile
        </a></li>
        <li><router-link  class="btn transparent white-text waves-effect" :to="goToAppointment">Appointment
        </router-link>
        </li>
        <li><a  class="btn transparent white-text waves-effect" @click="$eventBus.$emit('do-logout')">
        Logout
        </a>
      </li>
      </template>
    </fixednav>
    <medical-rec/>
    <router-view></router-view>
  </div>
</template>

<script>
import MedicalRec from '@/components/features/medicalRecord'
import Fixednav from '@/components/layouts/fixednav'
import navs from './navs'
export default {
  components: {MedicalRec, Fixednav},
  data () {
    return {
      goToAppointment: navs.links.appointment.url
    }
  }
}
</script>
