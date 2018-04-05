<template>
  <div class="view-user-drug">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <router-link to="/" class="btn transparent white-text waves-effect waves-light">Home</router-link></li>
        <li><router-link id="profile" class="btn transparent white-text waves-effect waves-light" :to="goToProfile">
          Profile
        </router-link></li>
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
                <button class="btn amber waves-effect waves-light" @click="editUserDrug">Edit</button>
                <button class="btn amber waves-effect waves-light" @click="removeFromPharmacy">Remove</button>  
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
  },
  methods: {
    editUserDrug () {
      this.$router.push(`/Pharmacist-interface/${encodeURIComponent(`my[]{}products`)}/view/${encodeURIComponent('edit / \\ { {} } [ ] data')}`)
    },
    async removeFromPharmacy () {
      if (confirm(`Are you sure you want to remove ${this.$store.state.currentUserDrug.drugName} from your list of drugs? \n\n NOTE: This can not be reversed.`)) {
        try {
          const removedData = (PharmacyServices.removeFromPharmacy({id: this.userDrug._id})).data
          alert('Drug successfully removed')
          // location.href = `/Pharmacist-interface`
          this.$router.push(`/Pharmacist-interface`)
          console.log(removedData)
        } catch (error) {
          console.log(error)
          if (error.removedData) {
            console.log(JSON.stringify(error.removedData))
          }
        }
      }
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
#nav-mobile > li > a {
    font-size: 0.7rem;
    outline: 0;
}
</style>
