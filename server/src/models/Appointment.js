const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const {Schema} = require('mongoose')
// const {ObjectId} = Schema.Types
const DateType = Schema.Types.Date
// const {objectId} = Schema.Types

const AppointmentSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  // doctor: {
  //   ref: 'doctor',
  //   type: ObjectId
  // },
  doctor: {
    type: String
  },
  reason: {
    type: String,
    trim: true
  },
  creator: {
    userType: String,
    fullName: String
  },
  setTime: {
    start: DateType,
    end: DateType
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
