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
    // getting all doctors from DB by names
    // Doctor.findOne({'fullName': regex}, 'fullName city state', (err, docs) => {
    //   if (!err && docs !== null) {
    //     let {fullName, city, state} = docs
    //     res.status(200).send({fullName, city, state})
    //     console.log(JSON.stringify({fullName, city, state}))
    //     res.render('/doctors', {fullName, city, state})
    //   } else {
    //     console.log(JSON.stringify(err + 'There was error searching ur input'))
    //   }
    // })
    Doctor.find({fullName: regex}, 'fullName city state', (err, docs) => {
      if (!err) {
        let {fullName, city, state} = docs
        if (docs !== []) {
          res.status(200).send(docs)
          // res.reender('/doctors', docs)
          console.log(fullName, city, state)
        } else {
          res.status(203).send('Doctor not found!')
        }
        // console.log({fullName: `${docs.fullName}`, city: `${docs.city}`, state: `${docs.state}`})
      } else {
        console.log(JSON.stringify(err))
      }
    })
  }
})

let escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
module.exports = router
