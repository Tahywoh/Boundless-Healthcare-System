const mongoose = require('mongoose')
const Schema = mongoose.Schema

// creating schema for photo upload
const photoSchema = new Schema({
  photoUrl: {
    original_filename: String,
    format: String,
    url: String,
    secure_url: String,
    public_id: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('photo', photoSchema)
