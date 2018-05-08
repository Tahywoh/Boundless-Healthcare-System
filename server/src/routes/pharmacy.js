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
    pharmData.seller = {}
    Pharmacist.findOne({email: seller}, 'pharmacyName', (err, result) => {
      if (!err) {
        pharmData.seller.name = result.pharmacyName
        pharmData.seller._id = result._id
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
            // console.log({pharmData})
            res.status(200).send(`Adding drug` + ' is a success')
          } else {
            console.log(JSON.stringify(err, null, 2))
          }
        })
      }
    })
  }
})

router.post('/updateDrug', (req, res) => {
  let {drugName, manufac, price, briefDescription, seller, id} = req.body
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

  Pharmacy.findOneAndUpdate({_id: id}, {
    $set: pharmData
  }, {
    upsert: true,
    new: true
  })
    .then(updatedDrug => {
      return res.status(200).send(updatedDrug)
    })
})

router.post('/removeDrug', (req, res) => {
  console.log(req.body)
  let {id} = req.body
  Pharmacy.findOneAndRemove({_id: id})
    .then(result => {
      // console.log(JSON.stringify(result, undefined, 3))
      res.status(200).send(result)
    })
})

router.post('/addToCart', (req, res) => {
  let {drug, user, userType} = req.body
  // let dataPharm
  Pharmacy.findOne({_id: drug}, 'drugName price seller briefDescription', (err, pharmResult) => {
    if (!err) {
      // let {price, seller, drugName} = pharmResult
      if (userType !== 'Patient') {
        res.status(403).send('Only patients can order drugs!')
      } else {
        Patient.findOneAndUpdate({email: user}, {
          $inc: {
            'carts.cartNo': 1
          },
          $push: {
            'carts.cartData': {
              drugName: pharmResult.drugName,
              price: pharmResult.price,
              seller: {
                name: pharmResult.seller.name,
                _id: pharmResult.seller._id
              },
              briefDescription: pharmResult.briefDescription,
              _id: pharmResult._id,
              Date: new Date().toISOString()
            }
          }
        }, {
          upsert: true,
          new: true
        })
          .then(saveToPatient => {
            console.log('carts and orders successfully pushed to their desired mongoose docs')
            res.status(200).send({saveToPatient: saveToPatient.carts})
          })
      }
    } else {
      console.log(JSON.stringify(err, null, 2))
    }
  })
})

router.post('/removeFromCart', (req, res) => {
  let {email, drug} = req.body
  var rData
  Patient.findOneAndUpdate({email}, {
    $inc: {
      'carts.cartNo': -1
    },
    $pull: {
      'carts.cartData': {
        _id: drug
      }
    }
  }, {
    upsert: true,
    new: true
  })
    .then(removedData => {
      rData = removedData
      // console.log(JSON.stringify(rData, null, 2))
      res.status(200).send(rData.carts)
    })
})

router.post('/placeOrder', (req, res) => {
  let {email, fullName, userType, drug, deliveryLoc} = req.body
  console.log(req.body)
  Pharmacy.findOneAndUpdate({_id: drug}, {
    $push: {
      'orders.requests': {
        email,
        _id: drug,
        fullName,
        userType,
        deliveryLoc,
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
      console.log({saveToPharm})
      res.status(200).send(saveToPharm)
    })
})

module.exports = router
