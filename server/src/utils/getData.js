const mongoose = require('mongoose')
require('../models/Pharmacy')
const Pharmacy = mongoose.model('pharmacy')

module.exports = {
  // getUserDrugs (req, res) {
  //   // console.log(JSON.stringify(req.url))
  //   Pharmacy.find()
  //     .then(pharm => {
  //       if (pharm) {
  //         res.status(200).send(pharm)
  //       }
  //     })
  //     .limit(10)
  //     .skip(10)
  // },
  getCurrentUserDrugs (req, res) {
    console.log(req.body)
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
  async getAllDrugs (req, res) {
    // console.log(res)
    try {
      Pharmacy.find()
        .then(pharmData => {
          res.status(200).send(pharmData)
          console.log('drug successfully fetched')
        })
    } catch (error) {
      res.status(403).send(error)
    }
  }
}
