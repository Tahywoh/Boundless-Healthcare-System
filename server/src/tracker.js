const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const cors = require('cors')
const morgan = require('morgan')
const config = require('./helpers/config')
const session = require('express-session')

// load routes
// TODO: token based auth(using jwt)
// TODO: joi for login verification
// TODO: using session, login users and logout users
// setting some params
app.set('sessionSecret', config.session_secret)
app.set('tokenSecret', config.token_secret)


const signup = require('./routes/signup');
const signin = require('./routes/signin');

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

app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/signup', signup)
app.use('/signin', signin)


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})
