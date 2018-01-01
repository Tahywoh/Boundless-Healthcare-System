
const http = require('http')
const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const socketIO = require('socket.io')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const search = require('./routes/search')
const signin = require('./routes/signin')
const signup = require('./routes/signup')

var server = http.createServer(app)

var io = socketIO(server)
const config = require('./helpers/config')

const port = process.env.PORT || 9000
const {generateMessage, generateLocationMessage} = require('./utils/message')

app.set('port', port)
app.set('sessionSecret', config.session_secret)
app.set('tokenSecret', config.token_secret)

// map global promise and get rid of warning
mongoose.Promise = global.Promise

// connect to mongoose(install save mongoose to node js module and sign up for mlab acct.)
mongoose.connect(config.local_db, {
  useMongoClient: true
}).then(() => console.log('connected to Mongo DataBase')).catch(err => console.log(err))

require('./models/Doctor')
require('./models/Patient')
// const Patient = mongoose.model('patient')
// load routes

// middlewares
app.use(morgan('dev'))
app.use(helmet())
app.disable('x-powered-by')
app.use(cors())
app.use(session({secret: app.get('sessionSecret'), resave: true, saveUninitialized: false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000')
  res.header('Access-Control-Allow-Credentials', true)
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// consultation socket IO connection

io.on('connection', (socket) => {
  console.log('New user connected...')
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
    io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}`, `${coords.longitude}`))
  })

  // socket.on('messageChannel', (data) => {
  //   console.log('messageChannel', data)
  // })

  socket.on('disconnect', () => {
    console.log('User was disconnected!')
  })
})

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

const doctors = require('./routes/doctors')

app.get('/doctors', doctors.getDoctors)
// app.get('/doctors/:id', doctors.getDoctor)

app.use('/search', search)
app.use('/signin', signin)
app.use('/signup', signup)

server.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
