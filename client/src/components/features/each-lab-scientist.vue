<template>
  <div class="view-lab">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <router-link to="/" class="btn transparent white-text waves-effect waves-light">Home</router-link></li>
        <li><router-link id="profile" class="btn transparent white-text waves-effect waves-light" :to="goToProfile">
          Profile
        </router-link></li>
          <li><a  class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('go-to-appointment')">Appointment
        </a>
        </li>
        <li><a  class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('do-logout')">
        Logout
        </a>
      </li>
      </template>
    </fixednav>

    <div class="lab-data">
      <h5 class="flow-text center blue white-text">{{labData.laboratoryName}}</h5>

      <div class="col row s12 m8 offset-m2">
        <div id="labScientistData">
          
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Fixednav from '@/components/layouts/fixednav'
export default {
  components: {Fixednav},
  data () {
    return {
      goToProfile: `/${this.$store.state.userType.replace(/\s/g, '')}`,
      labData: this.$store.state.currentLab
    }
  }
}
</script>

<style scoped>
div.view-lab h5.flow-text.center.blue.white-text {
    padding: 0.7rem;
    font-weight: 400;
}
div.view-lab div.row.s12.m8.offset-m2[data-v-3e0160c8] {
    /* border-top-left-radius: 73px; */
    padding: 1.5rem 1.7rem;
    border: 7px solid sandybrown;
    background-color: white;
    /* border-bottom-right-radius: 73px; */
    /* border-top-right-radius: 73px; */
    /* border-bottom-left-radius: 73px; */
    width: 66%;
    border-radius: 40px;
}
</style>

