<template>
  <div class="chat">
    <div class="chat__sidebar">
      <div>
      <p v-if="isConnected">You're connected to the server!</p>
      <p v-else>You're disconnected from the server!</p>
      </div>
      <h3>Attending doctor</h3>
      <div id="users"></div>
  </div>
 
  <div class="chat__main">
    <ol id="messages" class="chat__messages" >
      <li class="message" v-for="(socketMessage, index) in socketMessages" :key="index">
        <!-- {{socketMessages}} -->
        <div class="message__title">
        <h4>{{socketMessage.from}}</h4>
        <span v-html="socketMessage.createdAt"></span>
        </div>
        <div class="message__body">
          <p v-if="!socketMessage.url">{{socketMessage.text}}</p>
          <a v-else :href="socketMessage.url" target="_blank">Current location</a>
        </div>
      </li>
    </ol>
 
    <div class="chat__footer" id="chatFooter">
      <form id="message-form" @submit.prevent="validateForm">
        <input name="message" type="text" placeholder="Message" autofocus autocomplete="off" v-model="message"/>
        <button value="Send" @click="sendMessage">Send</button>
      </form>
      <button id="send-location" @click="sendLocation">Send location</button>
    </div>
  </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      isConnected: false,
      socketMessages: [],
      message: null
    }
  },
  sockets: {
    connect () {
      // Fired when the socket connects.
      if ((this.$store.state.token && this.$store.state.userType === 'Patient') || (this.$store.state.token && this.$store.state.userType === 'Doctor')) {
        console.log('New user connected... ')
        this.isConnected = true
        // this.$store.commit('SOCKET_CONNECT')
        // if (this.$store.state.isConnected) {
        //   this.isConnected = true
        // }
      }
    },
    disconnect () {
      this.isConnected = false
      console.log('Disconnected from server')
    },
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel (data) {
      this.socketMessage = data
    },
    newMessage (message) {
      if (this.isConnected) {
        this.scrollToBottom()
        this.message = message
        this.socketMessages.push(message)
        console.log('newMessage', message)
        this.message = ''
      } else {
        alert('Unable to connect to server')
        location.href = '/'
      }
    },
    newLocationMessage (message) {
      if (this.isConnected) {
        this.scrollToBottom()
        this.message = message
        this.socketMessages.push(message)
        console.log('locationMessage', message)
        this.message = ''
      } else {
        alert('Unable to connect to server')
        location.href = '/'
      }
    }
  },
  methods: {
    validateForm (e) {},
    sendMessage () {
      if (this.isConnected) {
        this.$socket.emit('createMessage', {
          from: this.$store.state.profile.fullName,
          text: this.message
        })
      } else {
        alert('Unable to connect to server')
        location.href = '/'
      }
    },
    sendLocation () {
      if (this.isConnected) {
        if (!navigator.geolocation) {
          return alert('Geolocation not supported by your browser')
        }
        var sendLocationBtn = document.getElementById('send-location')
        sendLocationBtn.setAttribute('disabled', 'disabled')
        sendLocationBtn.innerHTML = 'Sending location ...'
        navigator.geolocation.getCurrentPosition(position => {
          sendLocationBtn.removeAttribute('disabled')
          sendLocationBtn.innerHTML = 'Send location'
          console.log(position)
          this.$socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        }, () => {
          sendLocationBtn.removeAttribute('disabled')
          sendLocationBtn.innerHTML = 'Send location'
          alert('Unable to fetch location')
        })
      } else {
        alert('Unable to connect to server')
        location.href = '/'
      }
    },
    scrollToBottom () {
      // Selectors
      var messages = $('#messages')
      var newMessage = messages.children('li:last-child')
      // height

      var clientHeight = messages.prop('clientHeight')
      var scrollTop = messages.prop('scrollTop')
      var scrollHeight = messages.prop('scrollHeight')
      var newMessageHeight = newMessage.innerHeight()
      var lastMessageHeight = newMessage.prev().innerHeight()

      if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
      }
    },
    toCapitalize (capitalizeMe) {
      let obtained = []
      let capitalizeVal = capitalizeMe.toLowerCase().split(' ')
      capitalizeVal.forEach(word => {
        let newWord = word.split('')
        newWord[0] = newWord[0].toUpperCase()
        newWord = newWord.join('')
        obtained.push(newWord)
      })
      capitalizeMe = obtained.join(' ')
      return capitalizeMe
    }
  }
}
</script>

<style scoped>
ol li{
  overflow: hidden;
}
#messages > li > div.message__body > a{
  text-decoration: underline grey;
}
#messages > li > div.message__title > span{
  margin-top: -0.2rem;
}
button,button:hover{border:none;color:#fff;padding:10px}.chat__messages,.chat__sidebar ul{list-style-type:none}*{box-sizing:border-box;margin:0;padding:0;font-family:HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight:300;font-size:.95rem}li,ul{list-style-position:inside}h3{font-weight:600;text-align:center;font-size:1.5rem}button{background:#265f82;cursor:pointer;transition:background .3s ease}button:hover{background:#1F4C69}button:disabled{cursor:default;background:#698ea5}.centered-form{display:flex;align-items:center;height:100vh;width:100vw;justify-content:center;background:-moz-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-webkit-gradient(linear,left top,right bottom,color-stop(0,rgba(49,84,129,1)),color-stop(100%,rgba(39,107,130,1)));background:-webkit-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-o-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-ms-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:linear-gradient(325deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%)}.centered-form__form{background:rgba(250,250,250,.9);border:1px solid #e1e1e1;border-radius:5px;padding:0 20px;margin:20px;width:230px}.form-field{margin:20px 0}.form-field>*{width:100%}.form-field label{display:block;margin-bottom:7px}.form-field input,.form-field select{border:1px solid #e1e1e1;padding:10px}.chat{display:flex}.chat__sidebar{overflow-y:scroll;width:260px;height:100vh;background:-moz-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-webkit-gradient(linear,left top,right bottom,color-stop(0,rgba(49,84,129,1)),color-stop(100%,rgba(39,107,130,1)));background:-webkit-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-o-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-ms-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:linear-gradient(325deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%)}.chat__footer,.chat__sidebar li{background:#e6eaee;padding:10px}.chat__sidebar h3{color:#e6eaee;margin:10px 20px;text-align:left}.chat__sidebar li{border:1px solid #e1e1e1;border-radius:5px;margin:10px}.chat__main{display:flex;flex-direction:column;height:100vh;width:100%}.chat__messages{flex-grow:1;overflow-y:scroll;-webkit-overflow-scrolling:touch;padding:10px}.chat__footer{display:flex;flex-shrink:0}.chat__footer form{flex-grow:1;display:flex}.chat__footer form *{margin-right:10px}.chat__footer input{border:none;padding:10px;flex-grow:1}.message{padding:10px}.message__title{display:flex;margin-bottom:5px}.message__title h4{font-weight:600;margin-right:10px}.message__title span{color:#999}@media (max-width:600px){*{font-size:1rem}.chat__sidebar{display:none}.chat__footer{flex-direction:column}.chat__footer form{margin-bottom:10px}.chat__footer button{margin-right:0}}



.chat__main {
    display: flex !important;
    flex-direction: column !important;
    height: 90.7vh !important;
    width: 80% !important;
    border: 3px groove darkgray !important;
}
h3 {
    font-weight: 500 !important;
    text-align: center !important;
    font-size: 1.2rem !important;
}
.chat__sidebar {
    overflow-y: hidden;
    width: 260px;
    height: 50vh;
    background: -moz-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);
    background: -webkit-gradient(linear,left top,right bottom,color-stop(0,rgba(49,84,129,1)),color-stop(100%,rgba(39,107,130,1)));
    background: -webkit-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);
    background: -o-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);
    background: -ms-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);
    background: linear-gradient(325deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);
}
#message-form > input[type="text"] {
    background-color: #fff !important;
    border-bottom: none !important;
    height: inherit;
    margin: 0 !important;
    padding: 10px;
    font-family: HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif !important;
}
#message-form > input[type="text"]:focus, #message-form > input[type="text"]:active{
    border-bottom: 0px solid transparent !important;
    -webkit-box-shadow: 0 0px 0 0 transparent;
    box-shadow: 0 0px 0 0 transparent;
    /* border: 2px solid lightblue; */
    outline-offset: -2px;
    outline: -webkit-focus-ring-color auto 5px;
}
#message-form ::placeholder {
  color: #000 !important;
  font-weight: bold;
}



</style>
