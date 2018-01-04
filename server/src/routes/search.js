// const express = require('express')
const mongoose = require('mongoose')
const router = require('express').Router()

require('../models/Doctor')
const Doctor = mongoose.model('doctor')

router.post('/doctors', (req, res) => {
  // console.log(JSON.stringify(req.body.query, null, 2))
  // let doctorMatch = req.body.query
  if (req.body.query) {
    let regex = new RegExp(escapeRegex(req.body.query), 'gi')
    // })
    console.log(regex)

    Doctor.find({fullName: regex}, 'fullName city state', (err, docs) => {
      if (!err) {
        let {fullName, city, state} = docs
        if (docs !== []) {
          res.status(200).send(docs)
          // res.render('/doctors', docs)
          console.log(fullName, city, state)
        } else {
          res.status(203).send('Doctor not found!')
        }
        // console.log({fullName: `${docs.fullName}`, city: `${docs.city}`, state: `${docs.state}`})
      } else {
        console.log(JSON.stringify(err))
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

let escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
module.exports = router
