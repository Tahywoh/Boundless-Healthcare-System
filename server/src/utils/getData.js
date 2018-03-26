const mongoose = require('mongoose')
require('../models/Pharmacy')
require('../models/Doctor')
const Pharmacy = mongoose.model('pharmacy')
const Doctor = mongoose.model('doctor')

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
  async getAllDocs (req, res) {
    console.log(req.query)
    try {
      Doctor.find({}, 'fullName')
        .then(doc => {
          let {fullName} = doc
          console.log(fullName)
          // console.log('docs successfully fetched')
          let data = [
            { '_id': '5a3e15899e15f704185c17f8', 'fullName': 'Taiwo Adeshina' }, { '_id': '5a3e4cd605a5d12a847fe603', 'fullName': 'Akinpelu opeyemi' }, { '_id': '5a3f0fbc3c620a2a60105543', 'fullName': 'YUSUF RIDWAN' }, { '_id': '5a414375c8f2ae13b829ea6a', 'fullName': 'Adewale Adeshina' }, { '_id': '5a4e97cd4bc7842aa41a169c', 'fullName': 'OKEWALE SODIQ ABIODUN' }, { '_id': '5a8fb41ddb25901524357bf7', 'fullName': 'Adesare Adegbagi' }, { '_id': '5aac0df1eb79b113e0c45f15', 'fullName': 'Abdulquadri Adedayo' } ]
          // if (req.query.q) {
          //   for (var i = 0; i < data.length; i++) {
          //     if (req.query.q === data[i].fullName.toLowerCase().substr(0, req.query.q.split('').length)) {
          //       console.log(req.query.q)
          //       res.send(JSON.stringify(data))
          //     } else {
          //       console.log(data[i].fullName.substr(0, req.query.q.split('').length))
          //       res.send(`<h2>${req.query.q} not found!</h2>`)
          //     }
          //   }
          // } else {
          //   res.send(JSON.stringify(data))
          // }
          // res.status(200).send(JSON.stringify(doc, undefined, 3))
          res.send(JSON.stringify(data))
        })
    } catch (error) {
      console.log(error)
      res.status(403).send(error)
    }
  },
  async getAllDrugs (req, res) {
    // console.log(res)
    try {
      Pharmacy.find()
        .then(pharmData => {
          // let {seller, manufac, price, briefDescription, drugName} = pharmData
          // res.status(200).send(pharmData)
          // console.log(seller, manufac, price, briefDescription, drugName)
          console.log('drugs successfully fetched')
          res.status(200).send(JSON.stringify(pharmData, undefined, 3))
        })
    } catch (error) {
      console.log(error)
      res.status(403).send(error)
    }
  }
}
