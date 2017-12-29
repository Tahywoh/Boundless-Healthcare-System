import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: ''
  },

  mutations: {
    SOCKET_CONNECT (state) {
      state.isConnected = true
    },

    SOCKET_DISCONNECT (state) {
      state.isConnected = false
    },

    SOCKET_messageChannel (state, message) {
      state.socketMessage = message
    }
    // SOCKET_createMessage (state, message) {
    //   state.socketMessage = message
    // }
  },
  actions: {
    otherAction: (context, type) => {
      return true
    },
    socket_messageChannel: (context, message) => {
      // context.dispatch('newMessage', message)
      context.commit('NEW_MESSAGE_RECEIVED', message)
      if (message.is_important) {
        context.dispatch('alertImportantMessage', message)
      }
    }
    // socket_createMessage: (context, message) => {
    //   context.dispatch('newMessage', message)
    // }
  }
})
