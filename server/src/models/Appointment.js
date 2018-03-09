const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const {Schema} = require('mongoose')
// const {ObjectId} = Schema.Types
const DateType = Schema.Types.Date
const {ObjectId} = Schema.Types

const AppointmentSchema = new Schema({
  doctor: {
    ref: 'doctor',
    type: ObjectId
  },
  patient: {
    ref: 'patient',
    type: ObjectId
  },
  medlabscientist: {
    ref: 'medlabscientist',
    type: ObjectId
  },
  reason: {
    type: String,
    trim: true
  },
  creator: String,
  setTime: {
    start: String,
    end: String
  },
  note: {
    type: String,
    trim: true
  },
  status: {
    statusText: {
      type: String,
      default: 'pending'
    },
    date: DateType
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('appointment', AppointmentSchema)
