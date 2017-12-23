const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')



const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const signin =require('./routes/signin')
const signup =require('./routes/signup')


const config = require('./helpers/config')
const app = express()
const port = process.env .PORT || 9000

app.set('port', port)
app.set('sessionSecret', config.session_secret)
app.set('tokenSecret', config.token_secret)

//map global promise and get rid of warning
mongoose.Promise = global.Promise;

//connect to mongoose(install save mongoose to node js module and signp for mlab acct.)
mongoose.connect(config.local_db, {
    useMongoClient: true
}).then(() => console.log('connected to Mongo DataBase')).catch(err => console.log(err));

require('./models/Doctor')
require('./models/Patient')

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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  // console.log(JSON.stringify(req.body, null, 2))
  // var token = req.headers['x-access-token'] || req.body.token
  // if (token) {
  //   jwt.verify(token, req.app.get('tokenSecret'), function (err, decoded) {
  //     if (err) throw err
  //     req.decoded = decoded
  //     next()
  //   })
  // } else {
  //   res.status(403).json({'result': 'No token provided'})
  // }
})

// app.get('/doctors', (req, res) => {
//   // res.send('okay nah')
//   Patient.find().then(patient_data => {
//     res.status(200).send(JSON.stringify(patient_data))
//   })
// })


app.use('/signin', signin)
app.use('/signup', signup)

// app.use('./routes', routes)
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})
