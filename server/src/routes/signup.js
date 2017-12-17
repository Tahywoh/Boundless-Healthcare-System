const express = require('express'),
    mongoose = require('mongoose'),
    router = express(),
    bcrypt = require('bcrypt');
    validator = require('validator')

    require('../models/Patient');
    const authPolicy = require('../helpers/authPolicy')
  const Patient = mongoose.model('patient');
//load patient model
  router.post('/patient', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2))
    let { fullName, email, password, city, gender, age, state, address, telephone, profilePhoto } = req.body
    let patientData = {}
    if (req.body.password < 5) {
      req.body.password = ''
      req.body.confirmPassword = ''
      res.status(403).send('Password must be atleast 4 characters!')
    }
    else  if (req.body.password !== req.body.confirmPassword) {
      req.body.password = ''
      req.body.confirmPassword = ''
      res.status(403).send( 'Passwords do not match!')
    } 
    else {
        if (validator.isEmail(req.body.email)) {
          Patient.findOne({email: req.body.email})
            .then(patient=>{
              if (patient) {
                res.status(409).send('Email already exists!')
                email = ''
              }
              else {
                if (fullName === '') {
                  res.status(403).send('Full name is required')
                } 
                else if (fullName.length < 6) {
                  res.status(403).send('Length of full name is too small')
                } else if (fullName.length >= 6) {
                  patientData.fullName = fullName
                }
                if (city === '') {
                  res.status(403).send('You must provide your city')
                } else if(city.length < 3){
                  res.status(403).send('Invalid city name')
                } else if (city.length > 3) {
                  patientData.city = city
                }
                if (state === '') {
                  res.status(403).send('Your state is required to serve you better')
                } else if (state.length < 3) {
                  res.status(403).send('Invalid state name')
                } else if (state.length >= 3) {
                  patientData.state = state
                }
                if (address === '') {
                  res.status(403).send('You must supply your address')
                } else if (state.length < 3) {
                  res.status(403).send('Invalid state name')
                } else if (address && address.length > 13){
                  patientData.address = address
                }
                if (gender === 'Male' || gender === 'Female') {
                  patientData.gender = gender
                }
                if (age >= 16){
                  patientData.age = age
                }
                if (email && validator.isEmail(email)) {
                  patientData.email = email
                }
                else {
                  return res.status(422).send('Email is required')
                }
                if(!telephone){
                  res.status(403).send('Your phone number is required')
                } else if (telephone.length >=8){
                  patientData.telephone = telephone
                }
                if (password && password.length >=5) {
                  patientData.password = bcrypt.hashSync(password, 5)
                }

                let newPatient = new Patient(patientData)
                  // fullName: patientData.fullName,
                  // address: patientData.address,
                  // age: patientData.age,
                  // email: patientData.email,
                  // telephone: req.body.telephone,
                  // password: patientData.password,
                  // gender: patientData.gender,
                  // city: patientData.city,
                  // state: patientData.state
                // )
                newPatient.save(err =>{
                  if (!err) {
                    console.log('Patient successfully registered')
                    return res.status(201).json('Registration successful!')
                  }
                  else {
                    console.log(JSON.stringify(err, null, 3))
                    return res.status(500).send('Unable to register you, kindly try again.')
                  }
                })
              }
            })
        }
    }
  })



module.exports = router