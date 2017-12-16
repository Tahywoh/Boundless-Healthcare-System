const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const cors = require('cors')
const morgan = require('morgan')
const db = require('./helpers/config')

// load routes
const patients = require('./routes/patients');

//map global promise and get rid of warning
mongoose.Promise = global.Promise;

//connect to mongoose(install save mongoose to node js module and signp for mlab acct.)
mongoose.connect(db.authentication.database_url, {
    useMongoClient: true
}).then(() => console.log('connected to MongoDB')).catch(err => console.log(err));


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




app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/patients', patients)


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})
