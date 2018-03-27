const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create pharmacists scientistsschema
const PharmacistSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  telephone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String
  },
  gender: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  eduRequirement: {
    type: String,
    required: true
  },
  licenseRequirement: {
    type: String,
    required: true,
    trim: true
  },
  pharmacyName: {
    type: String,
    required: true,
    trim: true
  },
  pharmacyAddress: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('pharmacist', PharmacistSchema)
