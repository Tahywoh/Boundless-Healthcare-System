<template>
  <div class="pharmacistOrders">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <a href="/" class="btn transparent white-text waves-effect waves-light">Home</a></li>
        <li><a id="profile" class="btn transparent white-text waves-effect waves-light" :href="goToProfile">
          Profile
        </a></li>
        <li><a  class="btn transparent white-text waves-effect waves-light" @click="$eventBus.$emit('do-logout')">
        Logout
        </a>
      </li>
      </template>
    </fixednav>

    <router-view></router-view>
  </div>
</template>

<script>
import Fixednav from '@/components/layouts/fixednav'
// import GetServices from '@/services/getServices'
export default {
  components: {Fixednav},
  data () {
    return {
      goToProfile: `/${this.$store.state.userType.replace(/\s/g, '')}-interface/profile`
    }
  },
  async mounted () {}
}
</script>
