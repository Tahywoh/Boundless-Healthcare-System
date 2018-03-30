const mongoose = require('mongoose')
require('../models/Pharmacy')
require('../models/Doctor')
require('../models/MedlabScientist')
const MedlabScientist = mongoose.model('medlabscientist')
const Pharmacy = mongoose.model('pharmacy')
const Doctor = mongoose.model('doctor')

module.exports = {
  getCurrentUserDrugs (req, res) {
    Pharmacy.find({seller: req.body.user}, 'drugName manufac price briefDescription', (err, seller) => {
      if (!err) {
        let {drugName, manufac, price, briefDescription} = seller
        if (seller !== []) {
          res.status(200).send(seller)
          console.log(drugName, manufac, price, briefDescription)
        } else {
          res.status(203).send('You have not added drug yet')
        }
      } else {
        console.log(JSON.stringify(err))
      }
    })
  },
  getPharmacistOrders (req, res) {
    console.log(req.body)
    Pharmacy.find({seller: req.body.user}, {
      orders: {
        $elemMatch: {
          _id: 
        }
      }
    })
      .then(data => {
        let {noOfOrders} = data
        console.log({noOfOrders})
        res.status(200).send({data})
      })
  },
  async getAllDocs (req, res) {
    try {
      Doctor.find({}, 'fullName')
        .then(doc => {
          console.log('docs successfully fetched')
          res.status(200).send(doc)
        })
    } catch (error) {
      console.log(error)
      res.status(403).send(error)
    }
  },
  async getAllLabs (req, res) {
    try {
      MedlabScientist.find({}, 'laboratoryName laboratoryAddress fullName city state telephone')
        .then(result => {
          console.log('All registered labs successfully fetched')
          res.status(200).send(result)
        })
    } catch (error) {
      console.log(error)
    }
  },
  async getAllDrugs (req, res) {
    // console.log(res)
    try {
      Pharmacy.find()
        .then(pharmData => {
          console.log('drugs successfully fetched')
          res.status(200).send(pharmData)
        })
    } catch (error) {
      console.log(error)
      res.status(403).send(error)
    }
  }
}
