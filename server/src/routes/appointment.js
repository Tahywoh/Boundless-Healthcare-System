const router = require('express')()
const mongoose = require('mongoose')
require('../models/Appointment')
require('../models/Doctor')
require('../models/MedlabScientist')
require('../models/Patient')
const Appointment = mongoose.model('appointment')
const Doctor = mongoose.model('doctor')
const Patient = mongoose.model('patient')
// const Medlabscientist = mongoose.model('medlabscientist')

router.post('/seekAppointment', (req, res) => {
  console.log(JSON.stringify(req.body))
  // res.status(200).send(JSON.stringify(req.body, null, 2))
  let {doctor, patient, creator, reason, note, setTime} = req.body
  Doctor.find({email: doctor}, '_id', (err, result) => {
    if (!err) {
      let docId = result[0]._id
      // console.log(docId)
      // let doctor = result[0]._id
      // console.log(doctor)
      Patient.find({email: patient}, '_id', (err, result) => {
        if (!err) {
          let patientId = result[0]._id
          // console.log(patientId)
          let newAppointment
          // console.log(patient + '\n' + doctor)
          if (creator === 'doctor') {
            newAppointment = new Appointment({
              doctor, patient, reason, setTime, note
            })
          } else {
            newAppointment = new Appointment({
              doctor: docId,
              patient: patientId,
              reason
            })
          }
          newAppointment.save((err, data) => {
            if (!err) {
              // appointmentId = data._id
              res.status(200).send(JSON.stringify(data, null, 3))
              console.log(data)

              Appointment.find({reason})
                .populate('doctor patient', 'fullName')
                .exec((err, appointmentData) => {
                  if (!err) {
                    console.log('This is appointment data: %s', appointmentData)
                    res.status(200).send(JSON.stringify(appointmentData, null, 3))
                  } else {
                    console.log(JSON.stringify(err, null, 2))
                  // handle err
                  }
                })
            } else {
              // handle error
              console.log(JSON.stringify(err, null, 2))
            }
          })
        } else {
          // handle your error
          console.log(JSON.stringify(err, null, 2))
        }
      })
    } else {
      console.log(JSON.stringify(err, null, 2))
      // handle your error
    }
  })
})

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // next()
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

module.exports = router
