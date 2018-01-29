const socketIO = require('socket.io')
const {generateMessage, generateLocationMessage} = require('./message')
var server = require('http').createServer(require('express')())
var io = socketIO(server)
var messageUsers = 0
var consult = () => {
  io.on('connection', (socket) => {
    messageUsers++
    console.log(`New user connected, Total: ${messageUsers}`)
    socket.emit('newMessage', generateMessage('Admin', 'Welcome! Kindly consult your doctor by sending message to them'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))
    socket.on('createMessage', (message) => {
      console.log('createMessage', message)
      io.emit('newMessage', generateMessage(message.from, message.text))
    })

    socket.on('createLocationMessage', coords => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}`, `${coords.longitude}`))
    })

    socket.on('disconnect', () => {
      console.log('User was disconnected!')
    })
  })
}

module.exports = {consult}
