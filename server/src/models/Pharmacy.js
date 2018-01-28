const mongoose = require('mongoose')
const Schema = mongoose.Schema

// creating schema for drugs
const pharmacySchema = new Schema({
  drugName: {
    type: String,
    required: true,
    trim: true
  },
  briefDescription: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  manufac: {
    type: String,
    required: false
  },
  seller: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('pharmacy', pharmacySchema)
