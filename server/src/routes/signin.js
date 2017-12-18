const express = require('express'),
    mongoose = require('mongoose'),
    router = express(),
    bcrypt = require('bcrypt');
    validator = require('validator'),
    config = require('../helpers/config')
    authPolicy = require('../helpers/authPolicy')
    // session = require('express-session')

var jwt = require('jsonwebtoken')

    require('../models/Patient');
    // require('../models/Doctor')
    // require('../models/Pharmacist')
    // require('../models/Medlab Scientist')
  const Patient = mongoose.model('patient');
    // load patient model
  router.post('/', (req, res) => {
    // console.log(JSON.stringify(req.body, null, 3))
   
    
  })

 



module.exports = router
