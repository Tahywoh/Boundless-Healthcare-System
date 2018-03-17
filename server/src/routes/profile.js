const router = require('express').Router()
const validator = require('validator')
const mongoose = require('mongoose')

require('../models/Patient')
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
  // console.log(fullName, telephone, email, address, photoUrl, city, state)
  // res.send(req.body)
})

module.exports = router
