<template>
  <div id="eDrug">
<fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <router-link to="/" class="btn transparent white-text waves-effect">Home</router-link></li>
        <li><router-link id="profile" class="btn transparent white-text waves-effect" :to="goToProfile">
          Profile
        </router-link></li>
        <li><a  class="btn transparent white-text waves-effect" @click="$eventBus.$emit('do-logout')">
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
      <div class="row">
        <div class="col s12 m7">
           <button class="btn blue white-text x15">{{eachDrug.drugName}}</button>
          <div class="card">
            <div class="card-content">
              <h5>{{eachDrug.briefDescription}}</h5>
            </div>
            <div class="card-action">
              <h6><button class="blue btn seller">Seller </button>&nbsp;
              <br class="show-on-small-only"/>
              <br class="show-on-small-only"/>
              <strong class="x15">{{eachDrug.seller.name}}</strong></h6>
            </div>
            <div class="card-action" v-if="eachDrug.manufac">
              <h6><button class="blue btn manufacturer">Manufacturer </button>&nbsp;
              <br class="show-on-small-only"/>
              <br class="show-on-small-only"/>
              <strong class="x15">{{eachDrug.manufac}}</strong></h6>
            </div>
            <div class="additionalDetail card-action">
              <h6><button class="price btn blue">Price </button>&nbsp;
              <strong class="x15">{{eachDrug.price}}</strong>
              </h6>
              <h6><button class="currency btn blue">Currency </button>&nbsp;&nbsp;<i class="icon ion-pound x15"></i></h6>
              <h6><button class="btn amber waves-effect" @click="addToCart">Add to cart</button></h6>
            </div>
          </div>
        </div>
        <div class="recent-drugs col s4 grey lighten-2 push-s1 hide-on-small-only">
          <a><h5>Recently ordered drugs</h5></a>
          
          <div class="card-panel blue">
            <button class="btn grey">Paracetamol</button>
            <p>
              <span class="white-text">
              This is an antiseptic majorly used for Headache
            </span>
            </p>
          </div>

           <div class="card-panel blue">
            <button class="btn grey">Septrine</button>
            <p>
              <span class="white-text">
              This is a pain reliever especially for headache and stomache. It is also used when one is too tired.
            </span>
            </p>
          </div>

           <div class="card-panel blue">
            <button class="btn grey">Cough mix</button>
            <p>
              <span class="white-text">
              This is especially used for someone who is coughing. It helps heals cough completely
            </span>
            </p>
          </div>
          <a class="btn right waves-effect amber darken-3">More ...</a>
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
  components: {Fixednav},
  data () {
    return {
      eachDrug: this.$store.state.currentDrug,
      goToProfile: `/${this.$store.state.userType.replace(/\s/g, '')}-interface/profile`
    }
  },
  methods: {
    async addToCart () {
      try {
        let cartData = (await PharmacyServices.addToCart({drug: this.eachDrug._id, user: this.$store.state.profile.email, userType: this.$store.state.userType})).data
        this.$store.commit('SET_PATIENTCARTS', {patientCarts: cartData.saveToPatient})
        console.log({cartData})
        if (cartData.saveToPatient) {
          alert('Drug has successfully been added to your cart!')
        }
      } catch (error) {
        console.log({error})
        if (error.response.data) {
          console.log(JSON.stringify(error.response.data))
          alert(error.response.data)
        }
      }
    }
  }
}
</script>

<style>
#eDrug > div.row > div > div.recent-drugs.col.s4.m5 > div {
  padding: 0.7rem;
}
#eDrug > div.row > div > div.col.s8.m7 > div > div.additionalDetail.card-action > h6:nth-child(3){
  margin-left: 67%;
}
#eDrug > div.row > div{
  padding-top: 1.2rem;
}
#eDrug > div.row > div > div > div > div.card-content > h5{
  text-align: left !important;
}
#eDrug > div.row > div > div.iexist.col.s12.m5 > a {
    background-color: #bd4810;
}
#eDrug > div.row > div > div.col.s8.m7 {
  padding-top: 2rem;
}
</style>
