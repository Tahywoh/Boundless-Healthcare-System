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
const handlePhotos = require('./utils/handlePhotos')

var server = http.createServer(app)

var io = socketIO(server)
const config = require('./helpers/config')
const database = require('./helpers/database')

const port = process.env.PORT || 9000
const {generateMessage, generateLocationMessage} = require('./utils/message')

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
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8000')
  // res.header('Access-Control-Allow-Credentials', true)
  // // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // next()

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.get('/', (req, res) => {})
// consultation socket IO connection
var messageUsers = 0
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

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

app.use('/search', search)
app.use('/signin', signin)
app.use('/signup', signup)
app.use('/handlePhotos', handlePhotos)

server.listen(port, () => {
  console.log(`server is running on port`, port)
})
