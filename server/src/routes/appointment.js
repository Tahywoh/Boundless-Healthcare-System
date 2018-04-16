const router = require('express')()
const mongoose = require('mongoose')
require('../models/Appointment')
require('../models/Doctor')
require('../models/MedlabScientist')
require('../models/Patient')
const Appointment = mongoose.model('appointment')
const Doctor = mongoose.model('doctor')
const Patient = mongoose.model('patient')
const MedlabScientist = mongoose.model('medlabscientist')

router.post('/seekAppointment', (req, res) => {
  let {doctor, patient, creator, reason, setTime, labScientist} = req.body
  // eslint-disable-next-line
  let appointment_data = {}
  if (reason && reason.length > 10) {
    appointment_data.reason = reason
  } else {
    res.status(422).send('Enter a valid reason')
  }
  if (setTime.start && setTime.end) {
    appointment_data.setTime = setTime
  } else {
    res.status(422).send('Enter a valid start and end time of the appointment.')
  }
  if (patient) {
    appointment_data.patient = patient
  }
  if (doctor) {
    if (doctor) {
      appointment_data.doctor = doctor
    }
    Doctor.find({email: appointment_data.doctor}, '_id', (err, result) => {
      if (!err) {
        let docId = result[0]._id
        Patient.find({email: appointment_data.patient}, '_id', (err, result) => {
          if (!err) {
            let patientId = result[0]._id
            let newAppointment
            if (creator === 'Doctor') {
              newAppointment = new Appointment({
                doctor: appointment_data.doctor,
                patient: appointment_data.patient,
                reason: appointment_data.reason,
                setTime: appointment_data.setTime,
                creator: appointment_data.doctor
              })
            } else if (creator === 'Patient') {
              newAppointment = new Appointment({
                doctor: docId,
                patient: patientId,
                reason: appointment_data.reason,
                creator: appointment_data.patient,
                setTime: appointment_data.setTime
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
    if (labScientist) {
      appointment_data.medlabscientist = labScientist
    }
    MedlabScientist.find({email: labScientist}, '_id', (err, result) => {
      if (!err) {
        let medlabscientist = result[0]._id

        Patient.find({email: appointment_data.patient}, '_id', (err, result) => {
          if (!err) {
            let patientId = result[0]._id
            let newAppointment
            if (creator === 'MedlabScientist') {
              newAppointment = new Appointment({
                medlabscientist,
                patient: patientId,
                reason: appointment_data.reason,
                setTime: appointment_data.setTime,
                creator: appointment_data.medlabscientist
              })
            } else {
              newAppointment = new Appointment({
                medlabscientist,
                patient: patientId,
                reason: appointment_data.reason,
                creator: appointment_data.patient,
                setTime: appointment_data.setTime
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
      if (!err && result[0]._id) {
        let uid = result[0]._id
        Appointment.find({
          patient: uid
        })
          .populate('doctor patient', 'fullName')
          .populate('medlabscientist', ['fullName', 'laboratoryAddress', 'laboratoryName'])
          .exec((err, appointmentData) => {
            if (!err && appointmentData.length > 0) {
              res.status(200).send(JSON.stringify(appointmentData, null, 3))
            } else {
              console.log(JSON.stringify(err, null, 2))
            // handle err
            }
          })
      } else {
        console.log(JSON.stringify(err, null, 2))
        // res.status(403).send('No appointment yet!')
      }
    })
  } else if (user === 'Doctor') {
    Doctor.find({email: userId}, '_id', (err, result) => {
      if (!err && result[0]._id) {
        let uid = result[0]._id
        Appointment.find({
          doctor: uid
        })
          .populate('doctor patient', 'fullName')
          .exec((err, appointmentData) => {
            if (!err && appointmentData.length > 0) {
              res.status(200).send(JSON.stringify(appointmentData, null, 3))
            } else {
              console.log(JSON.stringify(err, null, 2))
            // handle err
            }
          })
      } else {
        console.log(JSON.stringify(err, null, 2))
        // res.status(403).send('No appointment yet!')
      }
    })
  } else {
    MedlabScientist.find({email: userId}, '_id', (err, result) => {
      if (!err && result[0]._id) {
        let uid = result[0]._id
        Appointment.find({
          medlabscientist: uid
        })
          .populate('patient', ['fullName'])
          .exec((err, appointmentData) => {
            if (!err && appointmentData.length > 0) {
            // let {patient} = appointmentData
            // console.log(fullName)
              res.status(200).send(JSON.stringify(appointmentData, null, 3))
            } else {
              console.log(JSON.stringify(err, null, 2))
              res.status(403).send('No appointment found!')
            // handle err
            }
          })
      } else {
        console.log(JSON.stringify(err, null, 2))
        // res.status(403).send('No appointment yet!')
      }
    })
  }
})

router.post('/setAppointmentDate', (req, res) => {
  let {appointment, setDate} = req.body
  Appointment.findOneAndUpdate({_id: appointment}, {
    $set: {
      'setTime.Date': setDate
    }
  }, {
    upsert: true,
    new: true
  })
    .then(result => {
      res.status(200).send(result)
    })
})

router.post('/updateAppointment', (req, res) => {
  let {appointment, setStatus} = req.body
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
