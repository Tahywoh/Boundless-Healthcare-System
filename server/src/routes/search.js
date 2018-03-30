// const express = require('express')
const mongoose = require('mongoose')
const router = require('express').Router()

require('../models/Doctor')
const getData = require('../utils/getData')
const Doctor = mongoose.model('doctor')
const Pharmacy = mongoose.model('pharmacy')
let escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

// All get requests comes here
router.get('/getAllDrugs', getData.getAllDrugs)
router.get('/getAllDocs', getData.getAllDocs)
router.get('/getAllLabs', getData.getAllLabs)

router.post('/userDrugs', getData.getCurrentUserDrugs)
router.post('/pharmacistOrders', getData.getPharmacistOrders)
router.post('/doctors', (req, res) => {
  // console.log(JSON.stringify(req.body.query, null, 2))
  // let doctorMatch = req.body.query
  if (req.body.query) {
    let regex = new RegExp(escapeRegex(req.body.query), 'gi')
    // })
    console.log(regex)
    Doctor.find({fullName: regex}, 'fullName email city state profilePhoto hospitalName hospitalAddress specialty', (err, docs) => {
      if (!err) {
        let {fullName, city, state, email, profilePhoto, hospitalAddress, hospitalName, specialty} = docs
        if (docs !== []) {
          res.status(200).send(docs)
          // res.render('/doctors', docs)
          console.log(fullName, city, state, email, profilePhoto, hospitalName, hospitalAddress, specialty)
        } else {
          res.status(203).send('Doctor not found!')
        }
        // console.log({fullName: `${docs.fullName}`, city: `${docs.city}`, state: `${docs.state}`})
      } else {
        console.log(JSON.stringify(err, null, 2))
      }
    })
    // Doctor.find({$text: { $search: 'taiwo' }})
    //   .then((doc, err) => {
    //     if (doc !== null && !err) {
    //       res.status(203).send(JSON.stringify(doc))
    //       console.log(doc)
    //     }
    //   })
  }
})

router.post('/pharmacy', (req, res) => {
  if (req.body.query) {
    let regex = new RegExp(escapeRegex(req.body.query), 'gi')

    console.log(regex)

    Pharmacy.find({drugName: regex}, 'seller drugName manufac briefDescription price', (err, pharmacy) => {
      if (!err) {
        let {seller, drugName, manufac, briefDescription, price} = pharmacy
        if (pharmacy !== null) {
          res.status(200).send(pharmacy)
          console.log(seller, drugName, manufac, briefDescription, price)
        } else {
          res.status(203).send('Drug not found! \n Please try searching with minimal words or strings')
          console.log(JSON.stringify(err, null, 2))
        }
      }
    })
  }
})

module.exports = router
