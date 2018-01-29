const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create pharmacists schema
const DoctorSchema = new Schema({
  docPatients: [
    {
      patientName: {
        type: String,
        trim: true
      }
    }
  ],
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
  specialty: {
    type: String,
    required: true
  },
  eduRequirement: {
    type: String,
    required: true
  },
  licenseRequirement: {
    type: String,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  hospitalAddress: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('doctor', DoctorSchema)
