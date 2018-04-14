<template>
  <div class="view-lab">
    <fixednav>
      <template slot="fixed-nav-bar">
        <li>
        <router-link to="/" class="btn transparent white-text waves-effect">Home</router-link></li>
        <li><router-link id="profile" class="btn transparent white-text waves-effect" :to="goToProfile">
          Profile
        </router-link></li>
        <li ><a  class="btn transparent white-text waves-effect" @click="$eventBus.$emit('go-to-appointment')">Appointment
        </a>
        </li>
        <li><a  class="btn transparent white-text waves-effect" @click="$eventBus.$emit('do-logout')">
        Logout
        </a>
      </li>
      </template>
    </fixednav>

    <div class="lab-data">
      <h5 class="flow-text center blue white-text">{{labData.laboratoryName}}</h5>

      <div class="col row s12 m8 offset-m2">
        <div id="labScientistData" class="row">
          <div class="input-field col s12 m1" v-if="labData.profilePhoto">
            <img :src="labData.profilePhoto" alt="user photo" class="responsive-img"> <!-- notice the "circle" class -->
          </div>
          <div class="input-field-col s12 m1" v-else>
            <i class="icon ion-android-contact x35 grey-text right center-align right-aligned" style="font-size: 10rem"></i>
          </div>
          <div class="input-field col s12 m7">
            <h5 class="labScientist">
              Laboratory Scientist: &nbsp; <span>{{labData.fullName}}</span>
            </h5>
            <h5 class="email">
              Email Address: &nbsp; <span>{{labData.email}}</span>
            </h5>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12 m7">
            <input id="telephone" type="text" class="validate"  v-model="labData.telephone" readonly>
              <label for="telephone" class="active">Telephone</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col 12 m7">
            <input id="city" type="text" class="validate"  v-model="labData.city" readonly>
              <label for="specialty" class="active">City</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col 12 m7">
            <input id="address" type="text" class="validate"  v-model="labData.laboratoryAddress" readonly>
              <label for="address" class="active">Laboratory Address</label>
          </div>
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
#app > div > div.lab-data > div > div > div {
  padding-top: 3.5rem;
}
div.view-lab div.lab-data > div {
    padding-top: 1rem;
    border-top-left-radius: 60px;
    border: 5px groove sandybrown;
    border-bottom-right-radius: 60px;
}
div.view-lab div.lab-data > div {
    padding: 0.3rem 2.7rem;
}
#labScientistData > div.input-field.col.s12.m7 {
  margin-top: 0.5rem;
}
#labScientistData > div.input-field.col.s12.m7 > h5 > span {
  font-weight: 500;
}
#labScientistData > div.input-field-col.s12.m1 > i {
    font-size: 10rem;
    margin-right: 12rem;
}
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

