<template>
  <div class="drug-edit">
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
      <template slot="fixed-mobile-nav">
        <li><router-link to="/" >Home</router-link></li>
        <div class="divider"></div>
        <li><router-link id="profile" :to="goToProfile">
          Profile
        </router-link></li>
        <div class="divider"></div>
        <li>
          <a @click="$eventBus.$emit('do-logout')">
          Logout
          </a>
        </li>
      </template>
    </fixednav>
    <div class="row">
    <div class="card  white col m7 s12">
    <h4 class="blue white-text">Edit Medication details</h4>
    <div class="divider"></div>
    <form class="col s12" @submit.prevent="validateForm">
      <div class="row">
        <div class="input-field col s6">
        <input id="drug_name" type="text" class="validate" v-model="pharmData.drugName" required>
        <label for="drug_name" class="active">Drug Name</label>
      </div>
      <div class="input-field col s6">
        <input id="manufacturer" type="text" class="validate" v-model="pharmData.manufac">
        <label for="manufacturer" class="active">Manufacturer</label>
      </div>
    </div>
    <div class="row">
      <div class="col s6">
        <h6><button class="currency btn blue">Currency: </button>&nbsp;&nbsp;<i class="icon ion-pound x15"></i></h6>
      </div>
      <div class="input-field col s6">
      <input id="price" type="number" class="validate" v-model="pharmData.price" min="50" max="50000" placeholder="Default currency is Naira  required(#)">
      <label for="price" class="active">Price</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <textarea id="briefDescrip" class="materialize-textarea" v-model="pharmData.briefDescription" required></textarea>
        <label for="briefDescrip" class="active">Brief Description</label>
      </div>
    </div>
    <button type="submit" class="waves-effect waves-light btn amber center-align" @click="updateDrug">Submit</button>
    </form>
</div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import Fixednav from '@/components/layouts/fixednav'
import PharmacyServices from '@/services/pharmacyServices'
export default {
  components: {Fixednav},
  data () {
    return {
      currency: '#',
      pharmData: {
        drugName: this.$store.state.currentUserDrug.drugName,
        manufac: this.$store.state.currentUserDrug.manufac,
        price: parseInt(this.$store.state.currentUserDrug.price.slice(1)),
        briefDescription: this.$store.state.currentUserDrug.briefDescription,
        seller: this.$store.state.profile.email,
        id: this.$store.state.currentUserDrug._id
      },
      goToProfile: `/${this.$store.state.userType.replace(/\s/g, '')}-interface/profile`
    }
  },
  methods: {
    validateForm (e) {},
    async updateDrug () {
      let validateDrug = {}
      validateDrug.id = this.pharmData.id
      if (this.pharmData.drugName !== '') {
        validateDrug.drugName = this.pharmData.drugName
      } else if (this.pharmData.drugName === null) {
        this.errorMsg = 'Please enter a valid drug name!'
        return false
      }
      if (this.pharmData.price !== null && !(this.pharmData.price < 50)) {
        validateDrug.price = this.currency + this.pharmData.price
      }
      if (this.briefDescription !== null) {
        validateDrug.briefDescription = this.pharmData.briefDescription
      }
      validateDrug.manufac = this.pharmData.manufac
      validateDrug.seller = this.pharmData.seller
      try {
        const updatedDrug = (await PharmacyServices.updateDrug(validateDrug)).data
        this.$store.commit('CLEAR_CURRENTUSERDRUGS')
        this.$store.commit('SET_CURRENTUSERDRUG', {currentUserDrug: updatedDrug})
        this.$router.push(`/Pharmacist-interface/${encodeURIComponent(`my[]{}products`)}/view/${encodeURIComponent('edit / \\ { {} } [ ] data')}`)
        // location.href = `/Pharmacist-interface/${encodeURIComponent(`my[]{}products`)}/view/${encodeURIComponent('edit / \\ { {} } [ ] data')}`
        alert('Drug has been successfully updated')
      } catch (error) {
        console.log(error)
        if (error.updatedDrug) {
          console.log(error.updatedDrug)
        }
      }
    }
  }
}
</script>
<style>
div.drug-edit div.row > div.card.col.m7.s12 {
  padding: 1rem;
}
div.drug-edit div.row > div > form > div {
  padding-top: 2.5rem;
}
div.drug-edit h4 {
  padding: 1.2rem;
}
#app > div > div.card.grey.lighten-3 > h4 {
  padding: 0.5rem;
  margin-top: -0.7rem;
}
#nav-mobile > li > a {
    font-size: 0.7rem;
    outline: 0;
}
#app > div > div.card.white > form {
    padding-top: 2.3rem;
}
#app > div > div.card.white > h4 {
    padding: 0.7rem;
    margin-top: -0.2rem;
}
</style>
