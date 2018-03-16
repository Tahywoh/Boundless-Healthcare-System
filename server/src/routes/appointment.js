const router = require('express')()
const mongoose = require('mongoose')
require('../models/Appointment')
require('../models/Doctor')
require('../models/MedlabScientist')
require('../models/Patient')
const Appointment = mongoose.model('appointment')
const Doctor = mongoose.model('doctor')
const Patient = mongoose.model('patient')
const Medlabscientist = mongoose.model('medlabscientist')

router.post('/seekAppointment', (req, res) => {
  let {doctor, patient, creator, reason, note, setTime, labScientist} = req.body

  if (doctor) {
    let docData = {}
    if (reason && reason.length > 10) {
      docData.reason = reason
    } else {
      res.status(422).send('Enter a valid reason')
    }
    if (setTime.start && setTime.end) {
      docData.setTime = setTime
    } else {
      res.status(422).send('Enter a valid start and end time of the appointment.')
    }
    if (doctor) {
      docData.doctor = doctor
    }
    if (patient) {
      docData.patient = patient
    }
    Doctor.find({email: docData.doctor}, '_id', (err, result) => {
      if (!err) {
        let docId = result[0]._id
        Patient.find({email: docData.patient}, '_id', (err, result) => {
          if (!err) {
            let patientId = result[0]._id
            let newAppointment
            if (creator === 'Doctor') {
              newAppointment = new Appointment({
                doctor: docData.doctor,
                patient: docData.patient,
                reason: docData.reason,
                setTime: docData.setTime,
                note,
                creator: docData.doctor
              })
            } else if (creator === 'Patient') {
              newAppointment = new Appointment({
                doctor: docId,
                patient: patientId,
                reason: docData.reason,
                creator: docData.patient,
                setTime: docData.setTime
              })
            }
            newAppointment.save((err, data) => {
              if (!err) {
                // appointmentId = data._id
                res.status(200).send(JSON.stringify(data, null, 3))
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
  }

  if (labScientist) {
    Medlabscientist.find({email: labScientist}, '_id', (err, result) => {
      if (!err) {
        let medlabscientist = result[0]._id

        Patient.find({email: patient}, '_id', (err, result) => {
          if (!err) {
            let patientId = result[0]._id
            let newAppointment
            if (creator === 'MedlabScientist') {
              newAppointment = new Appointment({
                medlabscientist,
                patient,
                reason,
                setTime,
                note,
                creator: req.body.labScientist
              })
            } else {
              newAppointment = new Appointment({
                medlabscientist,
                patient: patientId,
                reason,
                creator: req.body.patient,
                setTime
              })
            }
            newAppointment.save((err, data) => {
              if (!err) {
                // appointmentId = data._id
                res.status(200).send(JSON.stringify(data, null, 3))
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
      }
    })
  }
})

router.post('/fetchAppointments', (req, res) => {
  let {user, userId} = req.body
  // console.log(req.body)
  if (user === 'Patient') {
    Patient.find({email: userId}, '_id', (err, result) => {
      if (!err) {
        let uid = result[0]._id
        Appointment.find({
          patient: uid
        })
          .populate('doctor patient medlabscientist', 'fullName')
          .exec((err, appointmentData) => {
            if (!err && appointmentData !== null) {
              res.status(200).send(JSON.stringify(appointmentData, null, 3))
            } else {
              console.log(JSON.stringify(err, null, 2))
            // handle err
            }
          })
      }
    })
  } else if (user === 'Doctor') {
    Doctor.find({email: userId}, '_id', (err, result) => {
      if (!err) {
        let uid = result[0]._id
        Appointment.find({
          doctor: uid
        })
          .populate('doctor patient medlabscientist', 'fullName')
          .exec((err, appointmentData) => {
            if (!err && appointmentData !== null) {
              res.status(200).send(JSON.stringify(appointmentData, null, 3))
            } else {
              console.log(JSON.stringify(err, null, 2))
            // handle err
            }
          })
        return false
      } else {
        Medlabscientist.find({email: userId}, '_id', (err, result) => {
          if (!err) {
            let uid = result[0]._id
            Appointment.find({
              medlabscientist: uid
            })
              .populate('doctor patient medlabscientist', 'fullName')
              .exec((err, appointmentData) => {
                if (!err && appointmentData !== null) {
                // let {patient} = appointmentData
                // console.log(fullName)
                  res.status(200).send(JSON.stringify(appointmentData, null, 3))
                } else {
                  console.log(JSON.stringify(err, null, 2))
                // handle err
                }
              })
          }
        })
      }
    })
  }
})

router.post('/updateAppointment', (req, res) => {
  let {appointment, setStatus} = req.body
  // console.log(req.body)
  Appointment.findOneAndUpdate({_id: appointment}, {
    $set: {
      status: {
        statusText: setStatus,
        date: new Date().toISOString()
      }
    }
  }, {
    upsert: true,
    new: true
  })
    .then((newResult) => {
      console.log(newResult)
      res.status(200).send(newResult)
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
