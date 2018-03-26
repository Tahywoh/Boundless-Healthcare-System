<template>
  <div class="view-user-drug">
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
    <div class="row">
      <div class="row">
        <div class="col s8 m7">
           <button class="btn blue white-text x15">{{userDrug.drugName}}</button>
          <div class="card">
            <div class="card-content">
              <h5>{{userDrug.briefDescription}}</h5>
            </div>
            <div class="card-action" v-if="userDrug.manufac">
              <h6><button class="blue btn manufacturer">Manufacturer: </button>&nbsp;&nbsp;<strong class="x15">{{userDrug.manufac}}</strong></h6>
            </div>
            <div class="additionalDetail card-action">
              <h6><button class="price btn blue">Price:</button>&nbsp;
              <strong class="x15">{{userDrug.price}}</strong>
              </h6>
              <h6><button class="currency btn blue">Currency: </button>&nbsp;&nbsp;<i class="icon ion-pound x15"></i></h6>
            </div>
            <div class="card-action">
              <h6>
                <button class="btn amber waves-effect waves-light" >Edit</button>
                <button class="btn amber waves-effect waves-light">Remove</button>  
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
import Fixednav from '@/components/layouts/fixednav'
import PharmacyServices from '@/services/pharmacyServices'
export default {
  components: {Fixednav, PharmacyServices},
  data () {
    return {
      userDrug: this.$store.state.currentUserDrug,
      goToProfile: `/${this.$store.state.userType.replace(/\s/g, '')}-interface/profile`
    }
  }
}
</script>

<style>
#app > div > div.row > div > div {
  padding-top: 1.5rem;
}
#app > div > div.row > div > div > div > div.card-content > h5 {
  text-align: left !important;
}
</style>
