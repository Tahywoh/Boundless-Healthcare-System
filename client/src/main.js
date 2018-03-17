// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {sync} from 'vuex-router-sync'
import mixin from '@/plugins/mixins'
import store from '@/store/store'
import Vuex from 'vuex'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import VuexStore from '@/store/VuexStore'
// import 'materialize-css/dist/css/materialize.min.css'
// import 'materialize-css/dist/js/materialize.min.js'
// export const SocketInstance = socketio('https://server-xvjuwdaxhc.now.sh')

export const SocketInstance = socketio('http://localhost:8050')
Vue.use(VueSocketIO, SocketInstance, VuexStore)
Vue.use(Vuex)
Vue.prototype.$eventBus = new Vue()
// Vue.mixin(mixin)

Vue.config.productionTip = false
sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mixins: [mixin],
  template: '<App/>',
  components: {App}
})
