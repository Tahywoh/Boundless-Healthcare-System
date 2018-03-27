const router = require('express').Router()
const validator = require('validator')
const mongoose = require('mongoose')

require('../models/Patient')
require('../models/Doctor')
const Doctor = mongoose.model('doctor')
const Patient = mongoose.model('patient')

router.post(`/${encodeURI('update patient profile')}`, (req, res) => {
  let {fullName, telephone, email, address, profilePhoto, city, state} = req.body
  let patientData = {}
  if (profilePhoto) {
    patientData.profilePhoto = profilePhoto
  }
  if (fullName && fullName.length > 6) {
    patientData.fullName = fullName
  }
  if (email && validator.isEmail(email)) {
    patientData.email = email
  }
  if (telephone && telephone.length >= 9) {
    patientData.telephone = telephone
  } else {
    res.status(422).send('Invalid phone number')
  }
  if (city && city.length >= 3) {
    patientData.city = city
  }
  if (state && state.length >= 3) {
    patientData.state = state
  }
  if (address && address.length > 11) {
    patientData.address = address
  }

  Patient.findOneAndUpdate({email: patientData.email}, {
    $set: patientData
  }, {
    upsert: true,
    new: true
  })
    .then((newPatientData) => {
      return res.status(200).send(newPatientData.profilePhoto)
    })
})

// handling server sid of update doctor profile

router.post(`/${encodeURI('update doctor profile')}`, (req, res) => {
  let {fullName, telephone, email, profilePhoto, city, state, specialty, hospitalName, hospitalAddress, eduRequirement, licenseRequirement} = req.body
  console.log(req.body)
  let doctorData = {}
  if (profilePhoto) {
    doctorData.profilePhoto = profilePhoto
  }
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

  Doctor.findOneAndUpdate({email: doctorData.email}, {
    $set: doctorData
  }, {
    upsert: true,
    new: true
  })
    .then(newDocData => {
      console.log(JSON.stringify(newDocData))
      return res.status(200).send({newDocData})
    })
})

module.exports = router
