const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const cors = require('cors')
const morgan = require('morgan')
const db = require('./helpers/config')
// const flash = require('connect-flash')
// load routes
const signup = require('./routes/signup');
const signin = require('./routes/signin');

//map global promise and get rid of warning
mongoose.Promise = global.Promise;

//connect to mongoose(install save mongoose to node js module and signp for mlab acct.)
mongoose.connect(db.authentication.database_url, {
    useMongoClient: true
}).then(() => console.log('connected to Mongo DataBase')).catch(err => console.log(err));


// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cors())
app.use(morgan('combined'))
// app.use('register', (req, res, next){
//   res.header('Access-Control-Allow-Origin', true);
// });
// const config = require('./helpers/config')


// app.post('/registerPatient', (req, res) => {
//   res.send({
//     msg: JSON.stringify(req.body)
//   })
//   console.log(req.body)
  
// })

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
