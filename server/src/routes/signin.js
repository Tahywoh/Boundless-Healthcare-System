const exp = require('express')
const router = exp.Router()
const bcrypt = require('bcrypt')
const validator = require('validator')
const config = require('../helpers/config')
const mongoose = require('mongoose')

var jwt = require('jsonwebtoken')

require('../models/Patient')
require('../models/Doctor')
require('../models/Pharmacist')
require('../models/MedlabScientist')

const Patient = mongoose.model('patient')
const Doctor = mongoose.model('doctor')
const Pharmacist = mongoose.model('pharmacist')
const MedlabScientist = mongoose.model('medlabscientist')

router.post('/', (req, res) => {
  let {user, password, userType} = req.body
  // console.log(req.body)

  if (validator.isEmail(user)) {
    if (userType === 'Patient') {
      Patient.findOne({email: user}, 'user password fullName telephone city state address', (err, patientData) => {
        if (!err && patientData !== null) {
          let {fullName, telephone, city, state, address} = patientData
          let isValidPassword = bcrypt.compareSync(password, patientData.password)
          if (isValidPassword) {
            const payload = {
              user: patientData.user,
              patient_id: patientData._id
            }

            let token = jwt.sign(payload, config.token_secret)
            res.status(200).send(JSON.stringify({token, user, fullName, telephone, city, userType, state, address}))
          } else {
            res.status(401).send('Incorrect password!')
            return false
          }
        } else {
          if (err) {
            console.log(JSON.stringify(err, null, 2))
          } else {
            res.status(401).send('Patient does not exist!')
            return false
          }
          res.status(401).send('Unable to connect to internet')
          return false
        }
      })
    } else if (userType === 'Doctor') {
      if (validator.isEmail(user)) {
        Doctor.findOne({email: user}, 'user password fullName telephone state specialty city hospitalName hospitalAddress eduRequirement licenseRequirement', (err, doctorData) => {
          if (!err && doctorData !== null) {
            let {fullName, state, telephone, specialty, city, hospitalName, hospitalAddress, eduRequirement, licenseRequirement} = doctorData
            let isValidPassword = bcrypt.compareSync(password, doctorData.password)
            if (isValidPassword) {
              const payload = {
                user: doctorData.user,
                Doctor_id: doctorData._id
              }
              let token = jwt.sign(payload, config.token_secret)
              res.status(200).send(JSON.stringify({token, user, fullName, telephone, city, state, specialty, userType, hospitalName, hospitalAddress, eduRequirement, licenseRequirement}))
            } else {
              res.status(401).send('Incorrect password!')
              return false
            }
          } else {
            if (err) {
              console.log(JSON.stringify(err, null, 2))
            } else {
              res.status(401).send('Doctor does not exist!')
              return false
            }
            res.status(401).send('Unable to connect to internet')
            return false
          }
        })
      }
    } else if (userType === 'Pharmacist') {
      if (validator.isEmail(user)) {
        Pharmacist.findOne({email: user}, 'user password fullName telephone state city pharmacyName pharmacyAddress eduRequirement licenseRequirement', (err, pharmacistData) => {
          if (!err && pharmacistData !== null) {
            let {fullName, state, telephone, city, pharmacyName, pharmacyAddress, eduRequirement, licenseRequirement} = pharmacistData
            let isValidPassword = bcrypt.compareSync(password, pharmacistData.password)
            if (isValidPassword) {
              const payload = {
                user: pharmacistData.user,
                Pharmacist_id: pharmacistData._id
              }
              let token = jwt.sign(payload, config.token_secret)
              res.status(200).send(JSON.stringify({token, user, fullName, telephone, city, state, userType, pharmacyName, pharmacyAddress, eduRequirement, licenseRequirement}))
            } else {
              res.status(401).send('Incorrect password')
              return false
            }
          } else {
            if (err) {
              console.log(JSON.stringify(err, null, 2))
            } else {
              res.status(401).send('Pharmacist does not exist!')
              return false
            }
            res.status(401).send('Unable to connect to internet')
            return false
          }
        })
      }
    } else if (userType === 'MedicalLab Scientist') {
      if (validator.isEmail(user)) {
        MedlabScientist.findOne({email: user}, 'user password fullName telephone state city laboratoryName laboratoryAddress eduRequirement licenseRequirement', (err, medlabscientistData) => {
          if (!err && medlabscientistData !== null) {
            let {fullName, state, telephone, city, laboratoryName, laboratoryAddress, eduRequirement, licenseRequirement} = medlabscientistData
            let isValidPassword = bcrypt.compareSync(password, medlabscientistData.password)
            if (isValidPassword) {
              const payload = {
                user: medlabscientistData.user,
                MedlabScientist_id: medlabscientistData._id
              }
              let token = jwt.sign(payload, config.token_secret)
              res.status(200).send(JSON.stringify({token, user, fullName, telephone, city, state, userType, laboratoryName, laboratoryAddress, eduRequirement, licenseRequirement}))
            } else {
              res.status(401).send('Incorrect password')
              return false
            }
          } else {
            if (err) {
              console.log(JSON.stringify(err, null, 2))
            } else {
              res.status(401).send('Medical lab scientist does not exist!')
              return false
            }
            res.status(401).send('Unable to connect to internet')
            return false
          }
        })
      }
    } else {
      res.status(401).send('No internet access')
      // return res.status(404).send('No internet access')
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
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8000')
  // res.header('Access-Control-Allow-Credentials', true)
  // // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // next()

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
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
