const exp = require('express')
const router = exp.Router()
const bcrypt = require('bcrypt')
const validator = require('validator')
const config = require('../helpers/config')
const mongoose = require('mongoose')

var jwt = require('jsonwebtoken')

require('../models/Patient')
require('../models/Doctor')

const Patient = mongoose.model('patient')
const Doctor = mongoose.model('doctor')
// load patient model
router.post('/', (req, res) => {
  let {user, password, userType} = req.body
  console.log(req.body)

  if (validator.isEmail(user)) {
    if (userType === 'Patient') {
      Patient.findOne({email: user}, 'user password fullName telephone city', (err, patientData) => {
        if (!err && patientData !== null) {
          let {fullName, telephone, city} = patientData
          let isValidPassword = bcrypt.compareSync(password, patientData.password)
          if (isValidPassword) {
            const payload = {
              user: patientData.user,
              patient_id: patientData._id
            }

            let token = jwt.sign(payload, config.token_secret)
            res.status(200).send(JSON.stringify({token, user, fullName, telephone, city, userType}))
          } else {
            res.status(401).send('Incorrect password!')
          }
        } else {
          if (err) {
            console.log(JSON.stringify(err, null, 2))
          }
          return res.status(401).send('Patient does not exist!')
        }
      })
    } else if (userType === 'Doctor') {
      if (validator.isEmail(user)) {
        Doctor.findOne({email: user}, 'user password fullName telephone state specialty city', (err, doctorData) => {
          if (!err && doctorData !== null) {
            let {fullName, state, telephone, specialty, city} = doctorData
            let isValidPassword = bcrypt.compareSync(password, doctorData.password)
            if (isValidPassword) {
              const payload = {
                user: doctorData.user,
                Doctor_id: doctorData._id
              }
              let token = jwt.sign(payload, config.token_secret)
              res.status(200).send(JSON.stringify({token, user, fullName, telephone, city, state, specialty, userType}))
            } else {
              res.status(401).send('Incorrect password!')
            }
          } else {
            if (err) {
              console.log(JSON.stringify(err, null, 2))
            }
            res.status(401).send('Doctor does not exist!')
          }
        })
      }
    } else {
      return res.status(403).send('User not found!')
    }
  }
})

router.use((req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.status(401).send('Authorization failed! <br/> Please login!')
  }
})

router.use((req, res, next) => {
  var token = req.header['x-access-token'] || req.body.token

  if (token) {
    jwt.verify(token, config.token_secret, function (err, decoded) {
      if (!err) {
        req.decoded = decoded
        next()
      } else {
        res.status(403).send('invalid token supplied')
      }
    })
  } else {
    res.status(403).send('Authorizationn failed due to invalid token')
  }
})

module.exports = router
