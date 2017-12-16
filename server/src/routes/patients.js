const express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    bcrypt = require('bcrypt');

    require('../models/Patient');
  const Patient = mongoose.model('patient');
//load patient model
router.post('/registerPatient', (req, res) => {
  res.send({
    msg: JSON.stringify(req.body)
  })
  console.log(req.body)
})



module.exports = router