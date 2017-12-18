const express = require('express'),
    mongoose = require('mongoose'),
    router = express(),
    bcrypt = require('bcrypt');
    validator = require('validator')

  require('../models/Patient')
  require('../models/Doctor')

  const authPolicy = require('../helpers/authPolicy')
  const Patient = mongoose.model('patient')
  const Doctor = mongoose.model('doctor')

  router.post('/patient', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2))
    let { fullName, email, telephone, age, city, state, gender, address, password } = req.body
  
    let patientData = {}
    patientData.age = age
    if (fullName && fullName.length > 6) {
      patientData.fullName = fullName
    }
    if (email && validator.isEmail(email)) {
      patientData.email = email
    }
    if (telephone && telephone.length >=9 ) {
      patientData.telephone = telephone
    }
    if (city && city.length >= 3) {
      patientData.city = city
    }
    if (state && state.length >= 3) {
      patientData.state = state
    }
    if ((gender === 'Male' || gender === 'Female')) {
      patientData.gender = gender
    } else {
      res.status(403).send('You must choose your gender')
    }
    if (address && address.length > 11) {
      patientData.address = address
    }
    if (password && password.length >= 5) {
      patientData.password = bcrypt.hashSync(password, 10)
    } else {
      return res.status(422).send('invalid or no password supplied!')
    }
    Patient.findOne({email: patientData.email})
      .then(patient => {
        if (!patient) {
          let newPatient = new Patient(patientData)
          newPatient.save(err => {
            if (!err) {
              console.log('Registration successful!')
              return res.status(201).json('Patient has successfully been registered!')
            } else {
              if (err.code === 11000) {
                console.log('user already exist')
                return res.status(409).send('user already exist!')
              } else {
                console.log(JSON.stringify(err, null, 2))
                return res.status(500).send('There were errors registering you. <br/> We\' working towards fixing this!')
              }
            }
          })
        }  else {
          return res.status(409).send('User already exist!')
        }
      })
  })

  // Now we signup the doctor on the platform.

  router.post('/doctor', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2))
    let {fullName, email, telephone, age, city, state, gender, hospitalName, hospitalAddress, specialty, eduRequirement, licenseRequirement, password} = req.body

    let doctorData = {}
    doctorData.age = age
    if (fullName && fullName.length > 6) {
      doctorData.fullName = fullName
    }
    if (email && validator.isEmail(email)) {
      doctorData.email = email
    }
    if (telephone && telephone.length >= 9) {
      doctorData.telephone = telephone
    }
    if (city && city.length >= 3) {
      doctorData.city = city
    }
    if (state && state.length >= 3) {
      doctorData.state = state
    }
    if (gender === 'Male' || gender === 'Female') {
      doctorData.gender = gender
    } else {
      res.status(403).send('You must choose your gender')
    }
    if (hospitalName && hospitalName.length >= 7) {
      doctorData.hospitalName = hospitalName
    }
    if (hospitalAddress && hospitalAddress.length >= 10) {
      doctorData.hospitalAddress = hospitalAddress
    }
    if (specialty && specialty.length >= 8) {
      doctorData.specialty = specialty
    }
    if (eduRequirement && eduRequirement.length >= 10) {
      doctorData.eduRequirement = eduRequirement
    }
    if (licenseRequirement && licenseRequirement.length >= 7) {
      doctorData.licenseRequirement = licenseRequirement
    }
    if (password && password.length >= 5) {
      doctorData.password = bcrypt.hashSync(password, 10)
    } else {
      return res.status(422).send('invalid or no password supplied!')
    }
    let newDoctor = new Doctor(doctorData)
    newDoctor.save(err => {
      if (!err) {
        console.log('Registration successful')
        return res.status(201).json('Doctor has successfully been registered!')
      } else {
        if (err.code === 11000) {
          console.log('user already exist')
          return res.status(409).send('user already exist!')
        } else {
          console.log(JSON.stringify(err, null, 2))
          return res.status(500).send('There were errors registering you.<br/>We\' working towards fixing this!')
        }
      } 
    })
  })

  module.exports = router