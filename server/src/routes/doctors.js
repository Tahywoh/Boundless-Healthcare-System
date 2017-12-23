const mongoose = require('mongoose')
require('../models/Doctor')
const Doctor = mongoose.model('doctor')

module.exports = {
  async getDoctors (req, res) {
    try {
      Doctor.find().then(doctorData => {
        // doctorData = null
        res.status(200).send(JSON.stringify(doctorData))
        console.log(JSON.stringify(doctorData))
      })
    } catch (error) {
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
