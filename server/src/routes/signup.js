const express = require('express')
const mongoose = require('mongoose')
const router = express()
const bcrypt = require('bcrypt')
const validator = require('validator')

require('../models/Patient')
require('../models/Doctor')
require('../models/Pharmacist')
require('../models/MedlabScientist')

// const authPolicy = require('../helpers/authPolicy')
const Patient = mongoose.model('patient')
const Doctor = mongoose.model('doctor')
const Pharmacist = mongoose.model('pharmacist')
const MedlabScientist = mongoose.model('medlabscientist')

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
  if (telephone && telephone.length >= 9) {
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
      } else {
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
  } else {
    res.status(403).send('Enter a valid full name')
  }
  if (email && validator.isEmail(email)) {
    doctorData.email = email
  } else {
    res.status(403).send('Enter a valid email address')
  }
  if (telephone && telephone.length >= 9) {
    doctorData.telephone = telephone
  } else {
    res.status(403).send('Enter a valid phone number')
  }
  if (city && city.length >= 3) {
    doctorData.city = city
  } else {
    res.status(403).send('Enter a valid city name')
  }
  if (state && state.length >= 3) {
    doctorData.state = state
  } else {
    res.status(403).send('Enter a valid state name')
  }
  if (gender === 'Male' || gender === 'Female') {
    doctorData.gender = gender
  } else {
    res.status(403).send('You must choose your gender')
  }
  if (hospitalName && hospitalName.length >= 7) {
    doctorData.hospitalName = hospitalName
  } else {
    res.status(403).send('Enter a valid hospital name')
  }
  if (hospitalAddress && hospitalAddress.length >= 10) {
    doctorData.hospitalAddress = hospitalAddress
  } else {
    res.status(403).send('Enter a valid hospital Address')
  }
  if (specialty && specialty.length >= 7) {
    doctorData.specialty = specialty
  } else {
    res.status(403).send('Enter a valid specialty')
  }
  if (eduRequirement && eduRequirement.length >= 10) {
    doctorData.eduRequirement = eduRequirement
  } else {
    res.status(403).send('Enter a valid education requirements')
  }
  if (licenseRequirement && licenseRequirement.length >= 7) {
    doctorData.licenseRequirement = licenseRequirement
  } else {
    res.status(403).send('Enter a valid license requirements')
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
        return res.status(500).send('There were errors registering you.<br/>We\'re working towards fixing this!')
      }
    }
  })
})

router.post('/pharmacist', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  let {fullName, email, telephone, age, city, state, gender, pharmacyName, pharmacyAddress, eduRequirement, licenseRequirement, password} = req.body

  let pharmacistData = {}
  pharmacistData.age = age
  if (fullName && fullName.length > 6) {
    pharmacistData.fullName = fullName
  }
  if (email !== '' && validator.isEmail(email)) {
    pharmacistData.email = email
  }
  if (telephone && telephone.length >= 9) {
    pharmacistData.telephone = telephone
  }
  if (city && city.length >= 3) {
    pharmacistData.city = city
  }
  if (state && state.length >= 3) {
    pharmacistData.state = state
  }
  if (gender === 'Male' || gender === 'Female') {
    pharmacistData.gender = gender
  } else {
    res.status(403).send('You must choose your gender')
  }
  if (pharmacyName && pharmacyName.length >= 7) {
    pharmacistData.pharmacyName = pharmacyName
  }
  if (pharmacyAddress && pharmacyAddress.length >= 10) {
    pharmacistData.pharmacyAddress = pharmacyAddress
  }
  if (eduRequirement && eduRequirement.length >= 10) {
    pharmacistData.eduRequirement = eduRequirement
  }
  if (licenseRequirement && licenseRequirement.length >= 7) {
    pharmacistData.licenseRequirement = licenseRequirement
  }
  if (password && password.length >= 5) {
    pharmacistData.password = bcrypt.hashSync(password, 10)
  } else {
    return res.status(422).send('invalid or no password supplied!')
  }
  let newPharmacist = new Pharmacist(pharmacistData)
  newPharmacist.save(err => {
    if (!err) {
      console.log('Registration successful')
      return res.status(201).json('Medical lab scientist has successfully been registered!')
    } else {
      if (err.code === 11000) {
        console.log('user already exist')
        return res.status(409).send('user already exist!')
      } else {
        console.log(JSON.stringify(err, null, 2))
        return res.status(500).send('There were errors registering you.<br/>We\'re working towards fixing this!')
      }
    }
  })
})

router.post('/medlabscientist', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  let {fullName, email, telephone, age, city, state, gender, laboratoryName, laboratoryAddress, eduRequirement, licenseRequirement, password} = req.body

  let medlabscientistData = {}
  medlabscientistData.age = age
  if (fullName && fullName.length > 6) {
    medlabscientistData.fullName = fullName
  }
  if (email !== '' && validator.isEmail(email)) {
    medlabscientistData.email = email
  }
  if (telephone && telephone.length >= 9) {
    medlabscientistData.telephone = telephone
  }
  if (city && city.length >= 3) {
    medlabscientistData.city = city
  }
  if (state && state.length >= 3) {
    medlabscientistData.state = state
  }
  if (gender === 'Male' || gender === 'Female') {
    medlabscientistData.gender = gender
  } else {
    res.status(403).send('You must choose your gender')
  }
  if (laboratoryName && laboratoryName.length >= 7) {
    medlabscientistData.laboratoryName = laboratoryName
  }
  if (laboratoryAddress && laboratoryAddress.length >= 10) {
    medlabscientistData.laboratoryAddress = laboratoryAddress
  }
  if (eduRequirement && eduRequirement.length >= 10) {
    medlabscientistData.eduRequirement = eduRequirement
  }
  if (licenseRequirement && licenseRequirement.length >= 7) {
    medlabscientistData.licenseRequirement = licenseRequirement
  }
  if (password && password.length >= 5) {
    medlabscientistData.password = bcrypt.hashSync(password, 10)
  } else {
    return res.status(422).send('invalid or no password supplied!')
  }
  let newMedlabScientist = new MedlabScientist(medlabscientistData)
  newMedlabScientist.save(err => {
    if (!err) {
      console.log('Registration successful')
      return res.status(201).json('Pharmacist has successfully been registered!')
    } else {
      if (err.code === 11000) {
        console.log('user already exist')
        return res.status(409).send('user already exist!')
      } else {
        console.log(JSON.stringify(err, null, 2))
        return res.status(500).send('There were errors registering you.<br/>We\'re working towards fixing this!')
      }
    }
  })
})
router.use((req, res, next) => {
  newFunction(res, next)

  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // next()
})

module.exports = router
function newFunction (res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}
