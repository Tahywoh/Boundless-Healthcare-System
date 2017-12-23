const router = require('express').Router()

const Doctor = require('../models/Doctor')

router.post('/doctor', (req, res) => {
  let {doctorMatch} = req.body.query
  // if (req.body.query) { 
  //   console.log(JSON.stringify(req.body.query, null, 2))
  //   // let {doctorMatch, specialty_match, area_match} = req.body
  //   if (doctorMatch && (doctorMatch.trim().length === 0 || doctorMatch.trim() === '.' || doctorMatch.trim().toLowerCase() === 'dr' || doctorMatch.trim().toLowerCase() === 'dr.' || doctorMatch.trim().toLowerCase() === 'doctor')) {
  //     Doctor.find({}).exec((err, result) => {
  //       if (!err) {
  //         console.log(JSON.stringify(result, null, 2))
  //         res.status(200).send(result)
  //       } else {
  //         console.log(JSON.stringify(err, null, 2))
  //         res.status(500).send([])
  //       }
  //     })
    // } else
     if (doctorMatch) {
      Doctor.find({$text: {$search: doctorMatch}}, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}}).select('fullname firstname middlename addressDetails surname username email address city_of_residence profile_pic specialty').exec((err, result) => {
        if (!err) {
          console.log(JSON.stringify(result, null, 2))
          res.status(200).send(result)
        } else {
          console.log(JSON.stringify(err, null, 2))
          res.status(500).send([])
        }
      })
    } else {
      console.log(JSON.stringify(req.body, null, 2))
    res.status(400).send('search using the recognized format')
    }
})

module.exports = router