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
  let {user, password} = req.body
  let loginErrs = []
  let userType
  console.log(req.body, undefined, 3)
  if (validator.isEmail(user)) {
    Patient.findOne({email: user}, 'user password fullName telephone city state address profilePhoto carts patientDocs', (err, patientData) => {
      if (!err && patientData !== null) {
        userType = 'Patient'
        let {fullName, telephone, city, state, address, profilePhoto, carts, patientDocs} = patientData
        let isValidPassword = bcrypt.compareSync(password, patientData.password)
        if (isValidPassword) {
          const payload = {
            user: patientData.user,
            patient_id: patientData._id
          }
          let token = jwt.sign(payload, config.token_secret)
          // console.log(JSON.stringify({token, user, fullName, telephone, city, userType, state, address, profilePhoto, carts, patientDocs}, null, 2))
          res.status(200).send({token, user, fullName, telephone, city, userType, state, address, profilePhoto, carts, patientDocs})
        } else {
          // incorrect password
          res.status(401).send('Invalid login parameters!')
        }
      } else {
        if (err) loginErrs.push(err)
        Doctor.findOne({email: user}, 'user password profilePhoto fullName telephone state specialty city hospitalName hospitalAddress eduRequirement licenseRequirement', (err, doctorData) => {
          if (!err && doctorData !== null) {
            userType = 'Doctor'
            let {fullName, state, telephone, specialty, city, hospitalName, hospitalAddress, eduRequirement, licenseRequirement, profilePhoto} = doctorData
            let isValidPassword = bcrypt.compareSync(password, doctorData.password)
            if (isValidPassword) {
              const payload = {
                user: doctorData.user,
                Doctor_id: doctorData._id
              }
              let token = jwt.sign(payload, config.token_secret)
              res.status(200).send({token, user, fullName, telephone, city, state, specialty, userType, hospitalName, hospitalAddress, eduRequirement, licenseRequirement, profilePhoto})
            } else {
              // incorrect password
              res.status(401).send('Invalid login parameters!')
            }
          } else {
            if (err) loginErrs.push(err)
            Pharmacist.findOne({email: user}, 'user password profilePhoto fullName telephone state city pharmacyName pharmacyAddress eduRequirement licenseRequirement', (err, pharmacistData) => {
              if (!err && pharmacistData !== null) {
                userType = 'Pharmacist'
                let {fullName, state, telephone, city, pharmacyName, pharmacyAddress, eduRequirement, licenseRequirement, profilePhoto} = pharmacistData
                let isValidPassword = bcrypt.compareSync(password, pharmacistData.password)
                if (isValidPassword) {
                  const payload = {
                    user: pharmacistData.user,
                    Pharmacist_id: pharmacistData._id
                  }
                  let token = jwt.sign(payload, config.token_secret)
                  res.status(200).send({token, user, fullName, telephone, city, state, userType, pharmacyName, profilePhoto, pharmacyAddress, eduRequirement, licenseRequirement})
                } else {
                  // incorrect password
                  res.status(401).send('Invalid login parameters!')
                }
              } else {
                if (err) loginErrs.push(err)
                MedlabScientist.findOne({email: user}, 'user password fullName telephone state city laboratoryName laboratoryAddress profilePhoto eduRequirement licenseRequirement', (err, medlabscientistData) => {
                  if (!err && medlabscientistData !== null) {
                    userType = 'MedicalLab Scientist'
                    let {fullName, state, telephone, city, laboratoryName, laboratoryAddress, eduRequirement, licenseRequirement, profilePhoto} = medlabscientistData
                    let isValidPassword = bcrypt.compareSync(password, medlabscientistData.password)
                    if (isValidPassword) {
                      const payload = {
                        user: medlabscientistData.user,
                        MedlabScientist_id: medlabscientistData._id
                      }
                      let token = jwt.sign(payload, config.token_secret)
                      res.status(200).send({token, user, fullName, telephone, city, state, userType, laboratoryName, laboratoryAddress, eduRequirement, licenseRequirement, profilePhoto})
                    } else {
                      // incorrect password
                      res.status(401).send('Invalid login parameters!')
                    }
                  } else {
                    if (err) loginErrs.push(err)
                    console.log(JSON.stringify(loginErrs, undefined, 3))
                    res.status(403).send('You are not a registred user.<br/>Kindly register from the navbar to proceed')
                  }
                })
              }
            })
          }
        })
      }
    })
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
  // res.header('Access-Control-Allow-Origin', '*')
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
