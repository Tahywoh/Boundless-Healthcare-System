const mongoose = require('mongoose')
require('../models/Doctor')
const Doctor = mongoose.model('doctor')

module.exports = {
  async getDoctors (req, res) {
    try {
      Doctor.find().then(doctor_data => {
        // doctor_data = null
        res.status(200).send(JSON.stringify(doctor_data))
        console.log(JSON.stringify(doctor_data))
      })
    } catch(error) {
      res.status(404).send(error)
    }
  },
  getDoctor (req, res) {
    Doctor.findOne({_id: req.params.id}, (err, doctor) => {
      if (!err) {
        res.status(200).send(doctor)
      } else {
        console.log(JSON.stringify(err))
      }
    })
  }
}