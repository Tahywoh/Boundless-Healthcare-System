// console.log('database is running')
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
var pharmacy = require('./routes/pharmacy')
const appointment = require('./routes/appointment')
const handlePhoto = require('./utils/handlePhoto')
const profile = require('./routes/profile')
// const jwt = require('jsonwebtoken')
var server = http.createServer(app)

var io = socketIO(server)
const config = require('./helpers/config')
const database = require('./helpers/database')

const port = process.env.PORT || 8050
const {generateMessage, generateLocationMessage} = require('./socket/message')
const getData = require('./utils/getData')

app.set('port', port)
app.set('sessionSecret', config.session_secret)
app.set('tokenSecret', config.token_secret)

// map global promise and get rid of warning
mongoose.Promise = global.Promise

// connect to mongoose(install save mongoose to node js module and sign up for mlab acct.)
mongoose.connect(database.mongoURI, {
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

app.get('/getAllDrugs', getData.getAllDrugs)
// consultation socket IO connection
// var messageUsers = 0
io.on('connection', (socket) => {
  // messageUsers++
  // console.log(`New user connected, Total: ${messageUsers}`)
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

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // next()

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// app.use((req, res, next) => {
//   console.log(JSON.stringify(req.body, null, 2))
//   var token = req.headers['x-access-token'] || req.body.token
//   if (token) {
//     jwt.verify(token, req.app.get('tokenSecret'), function (err, decoded) {
//       if (err) console.log(JSON.stringify(err))
//       req.decoded = decoded
//       next()
//     })
//   } else {
//     res.status(403).json({'result': 'No token provided'})
//   }
// })

app.use('/search', search)
app.use('/signin', signin)
app.use('/signup', signup)
app.use('/pharmacy', pharmacy)
app.use('/appointment', appointment)
app.use('/handlePhoto', handlePhoto)
app.use('/profile', profile)

server.listen(port, () => {
  console.log(`server is running on port`, port)
})
