const mongoose = require('mongoose')

const Schema = mongoose.Schema
// create patients schema
const PatientSchema = new Schema({
  patientDocs: [
    {
      doctorName: String,
      doctorEmail: String
    }
  ],
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
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
    required: true,
    lowercase: true
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
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('patient', PatientSchema)
