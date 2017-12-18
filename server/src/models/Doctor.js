const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create pharmacists scientistsschema
const DoctorSchema = new Schema({
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
    type: Number,
    required: true
  },
  password: {
      type: String,
      required: true
  },
  profilePhoto: {
      type: String,
      required: false
  },
  gender: {
    type: String,
    required: true,
    lowercase: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
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
});

mongoose.model('doctor', DoctorSchema);