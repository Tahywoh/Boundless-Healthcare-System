const http = require('http')
const express = require('express')
const app = express()
const socketIO = require('socket.io')
var server = http.createServer(app)
var io = socketIO(server)
const port = process.env.PORT || 2000
const {generateMessage, generateLocationMessage} = require('./utils/message')

io.on('connection', (socket) => {
  console.log('New user connected')
  socket.emit('newMessage', generateMessage('Admin', 'Welcome! Kindly consult your doctor by sending message to them'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))
  socket.on('createMessage', (message, response) => {
    console.log('createMessage', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    response('This is from the server')
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date()
    // })
  })

  socket.on('createLocationMessage', coords => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}, ${coords.longitude}`))
  })

  // socket.on('messageChannel', (data) => {
  //   console.log('messageChannel', data)
  // })

  socket.on('disconnect', () => {
    console.log('User was disconnected!')
  })
})

server.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
