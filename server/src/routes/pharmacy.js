const express = require('express')
const router = express()
const mongoose = require('mongoose')

require('../models/Pharmacy')
const Pharmacy = mongoose.model('pharmacy')

router.post('/addDrug', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  let {drugName, manufac, price, briefDescription, seller} = req.body
  let pharmData = {}
  pharmData.seller = seller
  pharmData.manufac = manufac
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

module.exports = router
