const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DateType = Schema.Types.Date

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
  orders: {
    currentOrder: {
      type: Number,
      default: 0
    },
    requests: [
      {
        email: String,
        fullName: String,
        userType: String,
        orderedAt: DateType
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('pharmacy', pharmacySchema)
