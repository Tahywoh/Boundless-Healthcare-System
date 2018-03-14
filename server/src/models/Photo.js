const mongoose = require('mongoose')
const Schema = mongoose.Schema

// creating schema for photo upload
const photoSchema = new Schema({
  imageData: {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
  }
})

mongoose.model('photo', photoSchema)
