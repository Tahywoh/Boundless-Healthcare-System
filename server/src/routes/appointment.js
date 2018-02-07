const router = require('express')()
const mongoose = require('mongoose')
require('../models/Appointment')
const Appointment = mongoose.model('appointment')
// console.log(Appointment)
router.post('/seekAppointment', (req, res) => {
  console.log(JSON.stringify(req.body))
  // let {reason, }

  let newAppointment = new Appointment({
    doctor: req.body.doctor,
    reason: req.body.reason,
    creator: {
      userType: req.body.creator.userType,
      fullName: req.body.creator.fullName
    },
    setTime: {
      start: req.body.setTime.start,
      end: req.body.setTime.end
    }
  })
  newAppointment.save(err => {
    if (!err) {
      console.log('is a success(appointment)')
      res.status(200).send('successffully booked')
    } else {
      console.log(JSON.stringify(err, null, 2))
    }
  })
  // res.status(200).send(JSON.stringify(req.body))
})

module.exports = router
