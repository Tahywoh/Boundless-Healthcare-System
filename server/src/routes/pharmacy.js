const express = require('express')
const router = express()
const mongoose = require('mongoose')
require('../models/Pharmacist')
require('../models/Patient')
require('../models/Pharmacy')
const Pharmacy = mongoose.model('pharmacy')
const Patient = mongoose.model('patient')
const Pharmacist = mongoose.model('pharmacist')

router.post('/addDrug', (req, res) => {
  // console.log(JSON.stringify(req.body, null, 2))
  let {drugName, manufac, price, briefDescription, seller} = req.body
  let pharmData = {}
  pharmData.manufac = manufac
  if (seller) {
    Pharmacist.findOne({email: seller}, 'pharmacyName', (err, result) => {
      if (!err) {
        pharmData.seller = result.pharmacyName
        return pharmData.seller
      }
    })
  }
  if (drugName) {
    pharmData.drugName = drugName
  } else {
    res.status(403).send('Please enter a valid drug name!')
    return false
  }
  if (price) {
    pharmData.price = price
  } else {
    res.status(403).send('Please enter a valid price')
    return false
  }
  if (briefDescription) {
    pharmData.briefDescription = briefDescription
  } else {
    res.status(403).send('Please enter drug description')
    return false
  }

  let newDrug = new Pharmacy(pharmData)
  newDrug.save(err => {
    if (!err) {
      console.log(pharmData)
      res.status(200).send(`Adding drug` + ' is a success')
    } else {
      console.log(JSON.stringify(err, null, 2))
    }
  })
})

router.post('/placeOrder', (req, res) => {
  console.log(req.body)
  // res.send('seen')
  let {drug, user, userType} = req.body
  Pharmacy.findOne({_id: drug}, 'drugName price seller', (err, pharamResult) => {
    if (!err) {
      if (userType !== 'Patient') {
        res.status(203).send('Only patients can order drugs!')
      } else {
        Patient.findOne({email: user}, 'email fullName', (err, patientResult) => {
          if (!err) {
            // let orderedData = {noOfOrders: 0, requests: []}
            // orderedData.requests.push({
            //   email: patientResult.email,
            //   fullName: patientResult.fullName,
            //   userType,
            //   orderedAt: date})
            // orderedData.noOfOrders = orderedData.requests.length
            Pharmacy.findOneAndUpdate({_id: drug}, {
              $push: {
                'orders.requests': {
                  email: patientResult.email,
                  fullName: patientResult.fullName,
                  userType,
                  orderedAt: new Date().toISOString()
                }
              },
              $inc: {
                'orders.noOfOrders': 1
              }
            }, {
              upsert: true,
              new: true
            })
              .then(saveToPharm => {
                // console.log(JSON.stringify(saveToPharm, null, 3))
                res.status(200).send({saveToPharm})
              })
          } else {
            console.log(JSON.stringify(err, null, 2))
          }
        })
      }
    } else {
      console.log(JSON.stringify(err, null, 2))
    }
  })
})

module.exports = router
