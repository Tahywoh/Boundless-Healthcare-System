const router = require('express').Router()
const validator = require('validator')
const mongoose = require('mongoose')

require('../models/Patient')
require('../models/Doctor')
require('../models/Pharmacist')
require('../models/MedlabScientist')
const MedlabScientist = mongoose.model('medlabscientist')
const Pharmacist = mongoose.model('pharmacist')
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
      // console.log(JSON.stringify(newDocData, undefined, 2))
      return res.status(200).send({newDocData})
    })
})

router.post(`/${encodeURI('update pharmacist profile')}`, (req, res) => {
  let {fullName, email, telephone, city, state, profilePhoto, pharmacyName, pharmacyAddress, eduRequirement, licenseRequirement} = req.body

  let pharmacistData = {}

  if (profilePhoto) {
    pharmacistData.profilePhoto = profilePhoto
  }
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

  Pharmacist.findOneAndUpdate({email: pharmacistData.email}, {
    $set: pharmacistData
  }, {
    upsert: true,
    new: true
  })
    .then(newPharmData => {
      // console.log(JSON.stringify(newPharmData, null, 3))
      return res.status(200).send({newPharmData})
    })
})

router.post(`/${encodeURI('update medlabscientist profile')}`, (req, res) => {
  let {fullName, email, telephone, city, state, profilePhoto, laboratoryName, laboratoryAddress, eduRequirement, licenseRequirement} = req.body

  let medlabscientistData = {}
  if (profilePhoto) {
    medlabscientistData.profilePhoto = profilePhoto
  }
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

  MedlabScientist.findOneAndUpdate({email: medlabscientistData.email}, {
    $set: medlabscientistData
  }, {
    upsert: true,
    new: true
  })
    .then(result => {
      return res.status(200).send({result})
    })
})

module.exports = router
