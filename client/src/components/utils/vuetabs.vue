<template>
  <div class="vue-tabs-testing">
    <!-- <div class="row">
         <tabs>
            <tab name="Pharmacy">
              This is the content of the first tab
            </tab>
            <tab name="Messages">
              This is the content of the second tab
            </tab>
            <tab id="oh-hi-mark" name="Medical lab">
              The fragment that is appended to the url can be customized
            </tab>
        </tabs>      
    </div> -->
    <form>
  <label for="email">Email</label>
  <p class="control">
      <input id="email" class="input" type="email" name="email" v-model="user.email">
  </p>

  <label for="password">Password</label>
  <p class="control">
      <vue-password v-model="user.password" classes="input" :user-inputs="[user.email]"
      >
      </vue-password>
  </p>

  <p class="control">
      <button class="button is-primary">Register</button>
  </p>
</form>
  <router-view></router-view>
  </div>
</template>


<script>
import VuePassword from 'vue-password'
export default {
  components: {VuePassword},
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>
ul.tabs-component-tabs {
    position: relative !important;
    /* overflow-x: auto; */
    overflow: hidden !important;
    height: 48px !important;
    width: 100% !important;
    margin: 0 auto !important;
    white-space: nowrap !important;
    height: auto !important;
    display: inline !important;
    margin: auto -0.8rem !important;
    list-style-type: none !important;
}
  #app > div > div > div > ul > li.tabs-component-tab {
    font-weight: normal !important;
    white-space: nowrap !important;
    color: rgba(0,0,0,0.87) !important;
    width: 33.3333333333% !important;
    margin-left: auto !important;
    left: auto !important;
    right: auto !important;
    display: inline-block !important;
    text-align: center !important;
    line-height: 48px !important;
    height: 48px !important;
    padding: 0 !important;
    margin: 0 !important;
    text-transform: uppercase !important;
}
li.tabs-component-tab {
    font-weight: normal !important;
    white-space: nowrap !important;
    color: rgba(0,0,0,0.87) !important;
    width: 33.3333333333% !important;
    margin-left: auto !important;
    left: auto !important;
    right: auto !important;
    display: inline-block !important;
    text-align: center !important;
    line-height: 48px !important;
    height: 48px !important;
    padding: 0 !important;
    margin: 0 !important;
    text-transform: uppercase !important;
}
</style>
