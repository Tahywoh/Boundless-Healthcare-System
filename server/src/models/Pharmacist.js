const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create pharmacists scientistsschema
const PharmacistSchema = new Schema({
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
      unique: true
  },
  phoneNo: {
    type: Number,
    required: true
  },
  password: {
      type: String,
      required: true
  },
  profilePhoto: {
      type: String,
      required: true
  },
  gender: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pharmacyName: {
    type: String,
    required: true
  },
  pharmacyAddress: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
    }
});

mongoose.model('pharmacist', PharmacistSchema);