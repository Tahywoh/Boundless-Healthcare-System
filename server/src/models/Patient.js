const mongoose = require('mongoose')

const Schema = mongoose.Schema
// create patients schema
const DateType = Schema.Types.Date
const PatientSchema = new Schema({
  patientDocs: [
    {
      doctorName: String,
      doctorEmail: String
    }
  ],
  carts: {
    cartNo: {
      type: Number,
      default: 0
    },
    cartData: [
      {
        drugName: String,
        price: String,
        seller: String,
        Date: DateType
      }
    ]
  },
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
