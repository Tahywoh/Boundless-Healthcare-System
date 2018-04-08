<template>
  <div class="pharmacistOrders">
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

    <div class="ordered-data row">
      <div class="order-collection col s12 m10 offset-m1">
        <h5 class="text-center center-align blue collection-text">Orders</h5>
        <ul class="collapsible">
        <li v-for="(orderedDrug, index) in orderedDrugs" :key="orderedDrug._id" :id="index" @click="orderedRequests(orderedDrug.orders.requests)">
          <div class="collapsible-header">{{orderedDrug.drugName}} <span class="new badge amber">{{orderedDrug.orders.noOfOrders}}</span></div>
          <div class="collapsible-body">
            <div class="card-action row">
              <span class="description"><button class="description btn blue">Description</button><br><br>
                {{orderedDrug.briefDescription}}
              </span>
            </div>
            <div class="card-action row">
              <span class="price"><button class="price btn blue">Price</button>&nbsp;&nbsp;{{orderedDrug.price}}</span>
            </div>
            <div class="row">
              <button class="ordered-requests btn blue left">Requests</button><br><br>
              <div class="row">
                <div class="col s12 m10" v-if="requests">
                <div class="card blue-grey z-depth-2" v-for="(request, index) in requests" :key="request._id" :id="index">
                  <div class="card-content white-text">
                    <span class="card-title">{{request.fullName}}</span>
                    <div class="divider"></div>
                    <br>
                      <p>
                        <a class="btn waves-effect waves-light">Email </a>&nbsp;&nbsp;{{request.email}}
                      </p>
                      <br>
                      <p>
                        <a class="btn waves-effect waves-light">User Type </a>&nbsp;&nbsp;{{request.userType}}
                      </p>
                      <br>
                      <p>
                        <a class="btn waves-effect waves-light">Delivery location </a>&nbsp;&nbsp;<br class="show-on-small-only"><br class="show-on-small-only">{{request.deliveryLoc}}
                      </p>
                  </div>
                  <div class="card-action">
                    <a class="">{{formatDate(request.orderedAt)}}</a>
                    <!-- <a @click="processOrder(request._id)" :class="{processed: process}">{{unprocessed}}</a> -->
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Fixednav from '@/components/layouts/fixednav'
import M from 'materialize-css'
export default {
  components: {Fixednav},
  data () {
    return {
      orderedDrugs: this.$store.state.userData.pharmacistOrders,
      goToProfile: `/${this.$store.state.userType.replace(/\s/g, '')}-interface/profile`,
      requests: ''
    }
  },
  mounted () {
    var elem = document.querySelector('.collapsible')
    // eslint-disable-next-line
    var instance = M.Collapsible.init(elem, {
      accordion: true
    })
  },
  methods: {
    formatDate (d) {
      return new Date(d).toDateString() + `, ` + new Date(d).toLocaleTimeString()
    },
    orderedRequests (params) {
      this.requests = params
    }
  }
}
</script>

<style>
.collection-text {
  padding: 0.7rem;
}
div.ordered-data div.collapsible-header {
  text-transform: uppercase;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
}
div.ordered-data span.new.badge {
  text-transform: lowercase;
}
div.ordered-data div.card-action > a {
  font-size: 0.7rem
}
div.ordered-data div.card-action > a:nth-child(2) {
  cursor: pointer;
  margin-left: 50%;
}
div.ordered-data div.card-content.white-text > p > a {
    font-size: 0.7rem;
    padding: 0 0.5rem;
    line-height: 30px;
    height: 30px;
}
/* .processed{
  background-color: #fff;
} */
</style>
