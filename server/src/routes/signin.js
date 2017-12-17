const express = require('express'),
    mongoose = require('mongoose'),
    router = express(),
    bcrypt = require('bcrypt');
    validator = require('validator'),
    jwt = require('jsonwebtoken'),
    config = require('../helpers/config')
    authPolicy = require('../helpers/authPolicy')

    require('../models/Patient');
    // require('../models/Doctor')
    // require('../models/Pharmacist')
    // require('../models/Medlab Scientist')
    // const authPolicy = require('../helpers/authPolicy')
  const Patient = mongoose.model('patient');
//load patient model
  router.post('/', (req, res) => {
    let {user, password} = req.body, userType = req.body.userType
    console.log(JSON.stringify(req.body, null, 2))
  })



module.exports = router