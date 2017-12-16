const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create patients schema
const PatientSchema = new Schema({

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
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('patient', PatientSchema);