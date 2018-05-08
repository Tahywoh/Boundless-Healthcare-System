const mongoose = require('mongoose')
require('../models/Pharmacy')
require('../models/Doctor')
require('../models/MedlabScientist')
require('../models/Pharmacist')
const Pharmacist = mongoose.model('pharmacist')
const MedlabScientist = mongoose.model('medlabscientist')
const Pharmacy = mongoose.model('pharmacy')
const Doctor = mongoose.model('doctor')

module.exports = {
  getCurrentUserDrugs (req, res) {
    Pharmacy.find({'seller.name': req.body.user}, 'drugName manufac price briefDescription', (err, seller) => {
      if (!err) {
        let {drugName, manufac, price, briefDescription} = seller
        if (seller !== []) {
          res.status(200).send(seller)
          console.log(drugName, manufac, price, briefDescription)
        } else {
          res.status(203).send('You have not added drug yet')
        }
      } else {
        console.log(JSON.stringify(err, null, 3))
      }
    })
  },
  getPharmacistOrders (req, res) {
    let {email} = req.body
    Pharmacist.findOne({email}, '_id', (err, data) => {
      if (!err && data !== null) {
        let {_id} = data
        let id = _id
        Pharmacy.find({'seller._id': id})
          .then(result => {
            res.status(200).send(result)
          })
      } else {
        console.log(JSON.stringify(err, null, 3))
        res.status(403).send('Error finding user')
      }
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
      MedlabScientist.find({}, 'laboratoryName laboratoryAddress fullName city state telephone email')
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
      Pharmacy.find({}, 'drugName manufac price briefDescription seller')
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
