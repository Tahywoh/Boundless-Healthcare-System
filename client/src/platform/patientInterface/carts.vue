<template>
  <div class="patient-carts">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <router-link to="/" class="btn transparent white-text waves-effect">Home</router-link></li>
        <li><router-link id="profile" class="btn transparent white-text waves-effect" :to="goToProfile">
          Profile
        </router-link></li>
          <li ><a class="btn transparent white-text waves-effect" @click="$eventBus.$emit('go-to-appointment')">Appointment
        </a>
        </li>
        <li><a  class="btn transparent white-text waves-effect" @click="$eventBus.$emit('do-logout')">
        Logout
        </a>
      </li>
      </template>
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
    </fixednav>
   
    <div class="carts">
      <span class="blue darken-1 x2" v-if="this.$store.state.userData.patientCarts.cartNo <= 0">
        You have not added any drug to cart.
      </span>
      <span v-else class="center-align blue darken-1 text-center x2">Your carts <span class="circle amber notification-circle">{{patientCarts}}</span></span>
      <br><br>
      <div class="carts-view">
        <div class="row">
          <div class="col s12 m8 offset-m2" v-for="(cart, index) in carts" :id="index" :key="cart._id">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">{{cart.drugName}}</span>
                <p>{{cart.briefDescription}}</p>
              </div>
              <div class="card-action col s12">
                <a class="btn">Seller: &nbsp; {{cart.seller.name}}</a>
              </div>
              <div class="card-action col s12">
                <a class="btn">Price: &nbsp; {{cart.price}}</a>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <a class="btn waves-effect right" @click="removeFromCart(cart._id, cart.drugName)">Remove</a>
              </div>
              <div class="card-action col s12">
                <a class="btn waves-effect" @click="placeOrder(cart._id, cart.drugName)">Order</a>
              </div>
            </div>
        </div>
      </div>
      </div>
      <!-- <span class="text-center x25"><a class="btn white-text waves-light waves-effect" @click="placeOrder">Order now</a></span> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import navs from './navs'
import Fixednav from '@/components/layouts/fixednav'
import PharmacyServices from '@/services/pharmacyServices'
export default {
  components: {Fixednav},
  data () {
    return {
      carts: this.$store.state.userData.patientCarts.cartData,
      goToProfile: navs.links.profile.url,
      patientCarts: this.$store.state.userData.patientCarts.cartNo || 0
    }
  },
  mounted () {
    console.log(this.carts)
  },
  methods: {
    async removeFromCart (dataId, data) {
      if (confirm(`Are you sure you want to remove ${data} from your carts?`)) {
        try {
          let removedData = (await PharmacyServices.removeFromCart({email: this.$store.state.profile.email, drug: dataId})).data
          console.log(removedData)
          this.carts = removedData
          console.log({data: this.carts})
          this.$store.commit('CLEAR_CARTS')
          this.$store.commit('SET_PATIENTCARTS', {patientCarts: removedData})
          location.href = '/Patient-interface/carts'
          // this.$router.push('/Patient-interface/carts')
          alert('Item removed from cart!')
        } catch (error) {
          console.log(error)
          if (error.removedData) {
            console.log(JSON.stringify(error.removedData))
          }
        }
      }
    },
    async placeOrder (dataId, data) {
      if (confirm(`Do you want your drug to be delivered to the following address? \n ${JSON.stringify(this.$store.state.profile.address)}`)) {
        try {
          let orderRequest = (await PharmacyServices.placeOrder({email: this.$store.state.profile.email, fullName: this.$store.state.profile.fullName, userType: this.$store.state.userType, drug: dataId, deliveryLoc: this.$store.state.profile.address})).data
          console.log({orderRequest})
          alert('Your order request has been sent successfully. You will receive your package in due time')
          if (confirm(`Do you want to remove item from cart?`)) {
            this.removeFromCart(dataId, data)
          }
        } catch (error) {
          console.log(error)
          alert(error.response.data)
          if (error.orderRequest) {
            console.log(JSON.stringify(error.orderRequest))
          }
        }
      }
    }
  }
}
</script>

<style scoped>
#app > div > div.carts > span {
  font-size: 1.3rem;
  padding: 0.5rem;
}
#app > div > div.carts > span > span {
  font-size: 0.8rem;
  padding: 0.5rem;
}
#app > div > div.carts > span.text-center.x25 > a {
    font-size: 1rem;
    padding: 0 2.6rem;
}
div.card-content.white-text > span {
    font-weight: 600;
    text-transform: capitalize;
}
.btn, .btn-large, .btn-floating, .btn-large, .btn-flat {
    font-size: 1rem;
    outline: 0;
}
div.carts > div > div > div > div > div.card-action {
    height: 63px;
}
.carts {
  padding-top: 2rem;
}
#app > div > div.carts > span {
    padding: 0.8rem;
    border-radius: 10px;
    margin-left: 40%;
}
/* .carts-view {
  padding-top: 1.5rem;
} */
</style>
