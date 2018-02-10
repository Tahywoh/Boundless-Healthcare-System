var router = require('express').Router()
var multer = require('multer')
// const cloudinary = require('cloudinary')
var storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const mongoose = require('mongoose')
require('../models/Photo')
const Photo = mongoose.model('photo')

var upload = multer({storage: storage})
router.post('/uploads', upload.any(), (req, res) => {
  // console.log(JSON.stringify(req.headers))
  console.log('file received')
  let newPhoto = new Photo({imageData: req.files[0]})
  newPhoto.save(err => {
    if (!err) {
      console.log(JSON.stringify(req.files[0]))
      // console.log({'fieldname': req.files})
      res.status(200).send(JSON.stringify(req.files[0]))
    } else {
      console.log(JSON.stringify(err, null, 2))
    }
  })
  // res.status(200).send(JSON.stringify(req.files))
})
module.exports = router
