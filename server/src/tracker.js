const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 9000
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const config = require('./helpers/config')
const helmet = require('helmet')



require('./models/Doctor')
require('./models/Patient')

const Patient = mongoose.model('patient')
  const Doctor = mongoose.model('doctor')
// load routes


// TODO: using session, login users and logout users
// setting some params
const app = express()
app.use(helmet())
app.set('sessionSecret', config.session_secret)
app.set('tokenSecret', config.token_secret)


const signup = require('./routes/signup');
const signin = require('./routes/signin');
// const routes = require('./routes/index')


//map global promise and get rid of warning
mongoose.Promise = global.Promise;

//connect to mongoose(install save mongoose to node js module and signp for mlab acct.)
mongoose.connect(config.local_db, {
    useMongoClient: true
}).then(() => console.log('connected to Mongo DataBase')).catch(err => console.log(err));

// middlewares
app.use(session({secret: app.get('sessionSecret'), resave: true, saveUninitialized: false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cors())
app.use(morgan('combined'))
// app.disable('x-powered-by')
app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/doctors', (req, res) => {
  // res.send('okay nah')
  Patient.find().then(patient_data => {
    res.status(200).send(JSON.stringify(patient_data))
  })
})


app.use('/signup', signup)
app.use('/signin', signin)

// app.use('./routes', routes)
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})
