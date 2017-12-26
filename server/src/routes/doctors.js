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
    Doctor.findOne({_id: req.params.id}, 'fullName city state', (err, doctor) => {
      if (!err) {
        let {fullName, city, state} = doctor
        res.status(200).send({fullName, city, state})
        console.log({fullName, city, state})
      } else {
        console.log(JSON.stringify(err))
      }
    })
  }
}
