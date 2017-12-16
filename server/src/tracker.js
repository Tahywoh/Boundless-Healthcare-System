const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const cors = require('cors')
const morgan = require('morgan')

// load routes


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

app.post('/register', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send({
    msg: 'This is nice!'
  })
  console.log(req.body)
})




app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})
