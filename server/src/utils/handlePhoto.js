var router = require('express').Router()
var multer = require('multer')
const fileParser = require('connect-multiparty')()
const cloudinary = require('cloudinary')
cloudinary.config({cloud_name: 'taiwad', api_key: '869714852511566', api_secret: 'hOBuvh-tLT-yKTD9xm5mKLyb8eI'})
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
  console.log(req)
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

router.post('/imgUpload', fileParser, (req, res) => {
  var imageFile = req.files.photos
  console.log(req.files)
  console.log(imageFile)
  console.log(JSON.stringify(req, null, 3))
  cloudinary
    .v2
    .uploader
    .upload(imageFile.path, (error, result) => {
      if (!error) {
        console.log(result)
        if (result.url) {
          res.send(result.url)
        } else {
          console.log('err uploading at initial')
          res.status(413).send({message: 'Error uploading your picture, Please try again', code: 'NOT_OK'})
          console.log('Error uploading to cloudinary: ', JSON.stringify(result))
        }
      } else {
        res.status(500).send('Error uploading your picture, Please try  again')
        console.log('Error uploading to cloudinary: \n error: ', JSON.stringify(error))
      }
    })
})
module.exports = router
